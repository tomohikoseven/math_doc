import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob, type LoaderContext } from 'astro/loaders';
import { execSync } from 'child_process';
import fs from 'fs';

/**
 * Starlight 用のカスタムドキュメントローダー
 * 
 * Astro標準の glob ローダーをラップし、各ファイルの Git コミット履歴から
 * 「作成日」と「更新日」を取得します。
 * 取得した日時に基づき、以下の条件でフロントマターの sidebar.badge を自動付与します：
 * - 作成から2週間以内: 'NEW' バッジ (緑色)
 * - 更新から2週間以内 (作成は2週間より前): 'UPD' バッジ (青色)
 * 
 * ※ Git コマンドが失敗した場合や Git 管理外の環境では、ファイルシステムのメタデータにフォールバックします。
 */
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

/**
 * ファイルのコミット履歴、またはファイルシステムから最終更新日時と作成日時を取得します。
 */
function getFileTimestamps(filePath: string, now: number): { mtimeMs: number, ctimeMs: number } {
	const twoWeeksAgoSec = Math.floor((now - TWO_WEEKS_MS) / 1000);
	const gitPath = filePath.replace(/\\/g, '/');

	try {
		// 過去2週間以内のコミット履歴を新しい順に取得
		const recentOutput = execSync(`git log --since="@${twoWeeksAgoSec}" --format="%ct" -- "${gitPath}"`, { encoding: 'utf-8' }).trim();
		
		if (recentOutput) {
			const recentLines = recentOutput.split('\n');
			const mtimeMs = parseInt(recentLines[0], 10) * 1000;
			
			// 過去2週間より前のコミットが存在するかチェック (1件見つかれば十分なので-1)
			const oldOutput = execSync(`git log -1 --before="@${twoWeeksAgoSec}" --format="%ct" -- "${gitPath}"`, { encoding: 'utf-8' }).trim();
			if (oldOutput) {
				// 過去2週間より前にもコミットがある -> 新規作成ではない（ctimeは2週間より前になる適当な値でよい）
				return { mtimeMs, ctimeMs: now - TWO_WEEKS_MS - 1000 };
			} else {
				// 過去2週間より前のコミットがない -> 2週間以内に作成されたので一番古いコミットがctime
				return { mtimeMs, ctimeMs: parseInt(recentLines[recentLines.length - 1], 10) * 1000 };
			}
		} else {
			// 過去2週間以内にコミットがない場合、そもそも履歴があるかチェック (1件)
			const anyOutput = execSync(`git log -1 --format="%ct" -- "${gitPath}"`, { encoding: 'utf-8' }).trim();
			if (anyOutput) {
				// コミットはあるが全て2週間より前 -> NEWでもUPDでもない
				const timeMs = now - TWO_WEEKS_MS - 1000;
				return { mtimeMs: timeMs, ctimeMs: timeMs };
			}
			// コミット履歴が一切ない（未コミットのファイルなど）場合は下のフォールバックへ
		}
	} catch (e) {
		// gitコマンド失敗時などはファイルシステムにフォールバック
		console.warn(`[content.config.ts] git command failed for ${gitPath}:`, e);
	}

	// Git履歴から取得できない場合のフォールバック（ファイルシステム）
	const stat = fs.statSync(filePath);
	return {
		mtimeMs: stat.mtimeMs,
		ctimeMs: stat.birthtimeMs || stat.mtimeMs
	};
}

/**
 * タイムスタンプを基にバッジ情報を付与します。
 * 変更があった場合は true を返します。
 */
function applyBadgeIfRecent(entry: any, mtimeMs: number, ctimeMs: number, now: number): boolean {
	const isNew = now - ctimeMs < TWO_WEEKS_MS;
	const isUpdated = !isNew && (now - mtimeMs < TWO_WEEKS_MS);

	if (isNew || isUpdated) {
		const data = entry.data;
		data.sidebar = data.sidebar || {};
		if (!data.sidebar.badge) {
			data.sidebar.badge = isNew
				? { text: 'NEW', variant: 'success' } // 緑色
				: { text: 'UPD', variant: 'note' };   // 青色
			return true;
		}
	}
	return false;
}

const myDocsLoader = () => {
	// Astro標準のglobローダーを利用してファイル探索とMarkdownのパースを任せる
	const baseLoader = glob({
		pattern: "**/*.{md,mdx}",
		base: "./src/content/docs"
	});
	return {
		...baseLoader,
		name: 'my-docs-loader',
		load: async (context: LoaderContext) => {
			await baseLoader.load(context);
			const now = Date.now();
			
			for (const id of context.store.keys()) {
				const entry = context.store.get(id);
				if (!entry?.filePath) continue;

				const { mtimeMs, ctimeMs } = getFileTimestamps(entry.filePath, now);
				const hasChanged = applyBadgeIfRecent(entry, mtimeMs, ctimeMs, now);

				if (hasChanged) {
					context.store.set({ ...entry });
				}
			}
		}
	};
};

export const collections = {
	docs: defineCollection({
		loader: myDocsLoader(),
		schema: docsSchema({
			extend: z.object({
				schema: z.union([z.any(), z.array(z.any())]).optional(),
				// OKF (Open Knowledge Format) fields
				type: z.string().optional(),
				resource: z.string().optional(),
			}),
		}),
	}),
};


import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob, type LoaderContext } from 'astro/loaders';
import { execSync } from 'child_process';
import fs from 'fs';

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
			const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
			const now = Date.now();
			
			for (const id of context.store.keys()) {
				const entry = context.store.get(id);
				if (entry?.filePath) {
					let mtimeMs;
					let ctimeMs;
					try {
						// git コミット履歴から全コミット日時を取得（改行区切りで新しい順）
						const output = execSync(`git log --format="%ct" -- "${entry.filePath}"`, { encoding: 'utf-8' }).trim();
						if (output) {
							const lines = output.split('\n');
							mtimeMs = parseInt(lines[0], 10) * 1000;
							ctimeMs = parseInt(lines[lines.length - 1], 10) * 1000;
						} else {
							const stat = fs.statSync(entry.filePath);
							mtimeMs = stat.mtimeMs;
							ctimeMs = stat.birthtimeMs || stat.mtimeMs;
						}
					} catch (e) {
						// gitコマンド失敗時はファイルシステムの更新日時をフォールバック
						const stat = fs.statSync(entry.filePath);
						mtimeMs = stat.mtimeMs;
						ctimeMs = stat.birthtimeMs || stat.mtimeMs;
					}

					const isNew = now - ctimeMs < TWO_WEEKS_MS;
					const isUpdated = !isNew && (now - mtimeMs < TWO_WEEKS_MS);

					// 新規ならNEW、更新のみならUPDバッジを追加
					if (isNew || isUpdated) {
						const data = entry.data as any;
						data.sidebar = data.sidebar || {};
						if (!data.sidebar.badge) {
							if (isNew) {
								data.sidebar.badge = { text: 'NEW', variant: 'success' }; // 緑色
							} else if (isUpdated) {
								data.sidebar.badge = { text: 'UPD', variant: 'note' }; // 青色
							}
							context.store.set({ ...entry });
						}
					}
				}
			}
		}
	}
};

export const collections = {
	docs: defineCollection({
		loader: myDocsLoader(),
		schema: docsSchema({
			extend: z.object({
				schema: z.union([z.any(), z.array(z.any())]).optional(),
			}),
		}),
	}),
};


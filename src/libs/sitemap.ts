import { execSync } from 'node:child_process';
import fs from 'node:fs';

/**
 * URLから対応するマークダウンファイルのパスを推測し、
 * Gitのコミット履歴から最終更新日を取得します。
 * IndexNow などの自動送信ツールがサイトマップから更新を検知できるようにするための処理です。
 */
export function getLastModifiedDateFromGit(url: string): string | null {
  // 1. URLから相対パスを抽出（末尾の / を削除し、空の場合は index とする）
  let relativePath = url.replace('https://mathdoc.ifdef.jp/', '');
  if (relativePath.endsWith('/')) relativePath = relativePath.slice(0, -1);
  if (relativePath === '') relativePath = 'index';

  // 2. 対応するファイルパスの候補を作成（.mdx または .md）
  let filePath = `src/content/docs/${relativePath}.mdx`;
  if (!fs.existsSync(filePath)) {
    filePath = `src/content/docs/${relativePath}.md`;
  }

  // 3. ファイルが存在すれば、Git履歴から最終コミット日時を取得してISO文字列で返す
  if (fs.existsSync(filePath)) {
    try {
      const stdout = execSync(`git log -1 --format="%cI" -- ${filePath}`);
      const dateString = stdout.toString().trim();
      if (dateString) {
        return new Date(dateString).toISOString();
      }
    } catch (e) {
      // Gitコマンド失敗時（未コミットなど）はスキップ
    }
  }
  return null;
}

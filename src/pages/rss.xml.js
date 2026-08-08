import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getLastModifiedDateFromGit } from '../libs/sitemap';


export async function GET(context) {
    const allDocs = await getCollection('docs');

    const items = allDocs
        // ホームやディレクトリの一覧ページ（index.mdx）はフィードに含めない
        .filter((post) => post.id !== 'index' && !post.id.endsWith('/index'))
        .map((post) => {
            // Starlight のルーティングに合わせて URL を構築
            // 例: src/content/docs/math/structures/0009_what_is_structure.mdx -> /math/structures/0009_what_is_structure/
            const url = new URL(`/${post.id}/`, context.site);

            // 日付は frontmatter に存在しないため、Git履歴から最終更新日を取得して使用する
            let pubDate = getLastModifiedDateFromGit(url.toString());
            if (!pubDate && post.data.lastUpdated instanceof Date) {
                pubDate = post.data.lastUpdated.toISOString();
            }

            return {
                title: post.data.title,
                description: post.data.description,
                link: url.href,
                pubDate: pubDate ? new Date(pubDate) : undefined,
            };
        })
        // 日付を取得できた記事のみ掲載
        .filter((item) => Boolean(item.title && item.pubDate));

    return rss({
        title: '数学の主張',
        description: '現代数学の「構造」を切り口に、解析学や代数学を体系的にまとめたデジタルノートです。公式の暗記を脱却し、集合・写像・論理の基礎から数学の本質を深く理解するための学習法を解説します。また、効率的な勉強法や読書術など、学びを加速させるための実践的な情報も発信しています。',
        site: context.site,
        items,
        customData: `<language>ja-jp</language>`,
    });
}
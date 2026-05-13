import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import emoji from 'remark-emoji';
import rehypeTypst from '@myriaddreamin/rehype-typst';
import { typst } from 'astro-typst';
import d2 from 'astro-d2';
import fs from 'node:fs';

import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightLinksValidator from 'starlight-links-validator';

import { GOOGLE_ANALYTICS } from './src/libs/head';
import { SOCIAL_LINKS } from './src/libs/social';
import {
  SIDEBAR_TOPICS,
  SIDEBAR_TOPICS_OPTIONS
} from './src/libs/sidebar';

/**
 * .typファイルへのリンクを自動的に除外リストに登録するためのヘルパー
 */
function getTypstExcludes() {
  try {
    return fs.readdirSync('src/content/docs', { recursive: true })
      .filter(file => typeof file === 'string' && file.endsWith('.typ'))
      .map(file => '/' + file.replace(/\.typ$/, '/').replace(/\\/g, '/'));
  } catch (e) {
    return [];
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://mathdoc.ifdef.jp/',
  integrations: [
    starlight({
      title: '数学の主張',
      favicon: '/favicon.ico',
      locales: {
        root: {
          label: '日本語',
          lang: 'ja',
        },
      },
      head: [...GOOGLE_ANALYTICS],
      social: SOCIAL_LINKS,
      customCss: ['./src/styles/custom.css'],
      tableOfContents: true,
      lastUpdated: true,
      disable404Route: true,
      components: {
        Footer: './src/components/starlight/Footer.astro',
        Head: './src/components/starlight/Head.astro',
        TableOfContents: './src/components/starlight/TableOfContents.astro',
        Sidebar: './src/components/starlight/Sidebar.astro',
        MarkdownContent: './src/components/starlight/MarkdownContent.astro',
      },
      plugins: [
        starlightLinksValidator({
          exclude: [...getTypstExcludes()]
        }),
        starlightSidebarTopics(SIDEBAR_TOPICS, SIDEBAR_TOPICS_OPTIONS)
      ],
    }),
    typst({
      target: () => "svg"
    }),
    d2(),
    sitemap()
  ],
  markdown: {
    remarkPlugins: [remarkMath, emoji],
    rehypePlugins: [rehypeTypst],
  }
});
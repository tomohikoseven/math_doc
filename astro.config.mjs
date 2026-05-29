import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeTypst from '@myriaddreamin/rehype-typst';

import mermaid from 'astro-mermaid';

import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightLinksValidator from 'starlight-links-validator';
import remarkSmartypants from 'remark-smartypants';
import { unified } from '@astrojs/markdown-remark';

import { GOOGLE_ANALYTICS } from './src/libs/head';
import { SOCIAL_LINKS } from './src/libs/social';
import {
  SIDEBAR_TOPICS,
  SIDEBAR_TOPICS_OPTIONS
} from './src/libs/sidebar';



// https://astro.build/config
export default defineConfig({
  site: 'https://mathdoc.ifdef.jp/',
  vite: {
    build: {
      chunkSizeWarningLimit: 1500, // 警告のしきい値を 1500 kB（1.5 MB）に引き上げる
    }
  },
  integrations: [
    mermaid(),
    starlight({
      title: '数学の主張',
      logo: {
        src: './public/favicon.svg',
      },
      favicon: '/favicon.svg',
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
        MarkdownContent: './src/components/starlight/MarkdownContent.astro',
      },
      plugins: [
        starlightLinksValidator(),
        starlightSidebarTopics(SIDEBAR_TOPICS, SIDEBAR_TOPICS_OPTIONS)
      ],
    }),
    sitemap()
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkGfm, remarkSmartypants, remarkMath],
      rehypePlugins: [rehypeTypst],
    })
  }
});
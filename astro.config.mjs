import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeTypst from '@myriaddreamin/rehype-typst';

import rehypeMermaid from 'rehype-mermaid';
import partytown from '@astrojs/partytown';

import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightLinksValidator from 'starlight-links-validator';
import remarkSmartypants from 'remark-smartypants';

import { GOOGLE_ANALYTICS, MICROSOFT_CLARITY } from './src/libs/head';
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
  prefetch: true,
  integrations: [
    partytown({
      config: {
        forward: ['dataLayer.push'],
        lib: '/partytown/',
      },
    }),
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
      head: [...GOOGLE_ANALYTICS, ...MICROSOFT_CLARITY],
      social: SOCIAL_LINKS,
      customCss: [
        './src/styles/global.css',
        './src/styles/custom.css'
      ],
      tableOfContents: true,
      lastUpdated: true,
      disable404Route: true,
      components: {
        Footer: './src/components/starlight/Footer.astro',
        Head: './src/components/starlight/Head.astro',
        PageFrame: './src/components/starlight/PageFrame.astro',
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
      rehypePlugins: [rehypeMermaid, rehypeTypst],
    })
  }
});
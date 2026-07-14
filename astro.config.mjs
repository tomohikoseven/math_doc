// Astro Core & Integrations
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// Starlight Plugins
import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightLinksValidator from 'starlight-links-validator';

// Markdown & MDX Plugins
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkCjkFriendly from 'remark-cjk-friendly';
import remarkCjkFriendlyStrikethrough from 'remark-cjk-friendly-gfm-strikethrough';
import rehypeTypst from '@myriaddreamin/rehype-typst';
import rehypeMermaid from 'rehype-mermaid';

// Local Libs
import { GOOGLE_ANALYTICS, MICROSOFT_CLARITY } from './src/libs/head';
import { SOCIAL_LINKS } from './src/libs/social';
import { SIDEBAR_TOPICS, SIDEBAR_TOPICS_OPTIONS } from './src/libs/sidebar';
import { getLastModifiedDateFromGit } from './src/libs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mathdoc.ifdef.jp/',
  vite: {
    build: {
      chunkSizeWarningLimit: 1500, // 警告のしきい値を 1500 kB（1.5 MB）に引き上げる
      rollupOptions: {
        // @ts-ignore
        checks: { preferBuiltinFeature: false }
      }
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
    sitemap({
      serialize(item) {
        // サイトマップの各URLに対して、IndexNow用に最終更新日(<lastmod>)を付与する
        const lastmod = getLastModifiedDateFromGit(item.url);
        if (lastmod) {
          item.lastmod = lastmod;
        }
        return item;
      }
    })
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkGfm, remarkSmartypants, remarkMath, remarkCjkFriendly, remarkCjkFriendlyStrikethrough],
      rehypePlugins: [rehypeMermaid, rehypeTypst],
    })
  }
});
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import emoji from 'remark-emoji';

import starlightLinksValidator from 'starlight-links-validator';
import { KATEX, GOOGLE_ANALYTICS } from './src/libs/head';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mathdoc.ifdef.jp/',
  integrations: [starlight({
    favicon: '/favicon.ico',
    locales: {
      root: {
        label: '日本語',
        lang: 'ja', // langはルートロケールに必要です
      },
    },
    head:[
     KATEX, 
     ...GOOGLE_ANALYTICS,
    ],
    plugins: [starlightLinksValidator()],
    title: '数学の主張',
    components: {
      // オーバーライド
      Footer: './src/components/Footer.astro',
      Head: './src/components/Head.astro',
      TableOfContents: './src/components/TableOfContents.astro',
      Sidebar: './src/components/Sidebar.astro',
    },
    tableOfContents: true, 
    lastUpdated: true, 
    disable404Route: true, 
    customCss: [ './src/styles/custom.css' ] ,
    social: {
      github: 'https://github.com/tomohikoseven',
      'x.com': 'https://x.com/tomohikoseven',
      'instagram': 'https://www.instagram.com/nagasetomohiko/',
    },
    sidebar: [
    {
      label: '実数論',
      collapsed: true, 
      autogenerate : {
        directory: 'real_number',
        collapsed: true,
      }
    }, 
    {
      label: '線形代数',
      collapsed: true, 
      autogenerate: {
        directory: 'linear_algebra',
        collapsed: true,
      }
    },
    {
      label: '数学全般',
      collapsed: true, 
      autogenerate: {
        directory: 'other',
        collapsed: false,
      }
    },
    {
      label: '数学日誌',
      collapsed: true, 
      autogenerate: {
        directory: 'diary',
        collapsed: false,
      }
    },
    {
      label: 'Software',
      autogenerate: {
        directory: 'software',
        collapsed: true,
      }
    },
    {
      label: 'サイトについて',
      collapsed: false,
      autogenerate: {
        directory: 'mywebsite',
        collapsed: false,
      }
    }]
  }), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath, emoji],
    rehypePlugins: [ [rehypeKatex, {strict: true}] ],
  }
});
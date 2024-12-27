import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import starlightLinksValidator from 'starlight-links-validator';
import { KATEX, GOOGLE_SITE_VERIFICATION, GOOGLE_ANALYTICS, BUY_ME_A_COFFEE } from './src/libs/head';

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
     GOOGLE_SITE_VERIFICATION,
     ...GOOGLE_ANALYTICS,
      BUY_ME_A_COFFEE,
    ],
    plugins: [starlightLinksValidator()],
    title: '数学の主張',
    tableOfContents: true, 
    lastUpdated: true, 
    disable404Route: true, 
    customCss: [ './src/styles/custom.css' ] ,
    social: {
      github: 'https://github.com/tomohikoseven',
      'x.com': 'https://x.com/tomohikoseven'
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
      label: 'Software',
      autogenerate: {
        directory: 'software',
        collapsed: true,
      }
    },
    {
      label: 'その他',
      collapsed: true, 
      autogenerate: {
        directory: 'other',
        collapsed: false,
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
    remarkPlugins: [remarkMath],
    rehypePlugins: [ [rehypeKatex, {strict: true}] ],
  }
});
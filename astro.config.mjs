import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import emoji from 'remark-emoji';

import starlightLinksValidator from 'starlight-links-validator';
import { KATEX, GOOGLE_ANALYTICS } from './src/libs/head';
import { REAL_NUMBER, LINEAR_ALGEBRA, MATHEMATICS, MATH_DIALY, SOFTWARE, ABOUT_MY_WEBSITE, HIGH_SCHOOL_MATH } from './src/libs/sidebar';

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
      REAL_NUMBER, 
      LINEAR_ALGEBRA,
      MATHEMATICS, 
      MATH_DIALY,
      HIGH_SCHOOL_MATH,
      SOFTWARE, 
      ABOUT_MY_WEBSITE
    ]
  }), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath, emoji],
    rehypePlugins: [ [rehypeKatex, {strict: true}] ],
  }
});
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import emoji from 'remark-emoji';
import rehypeTypst from '@myriaddreamin/rehype-typst';
import d2 from 'astro-d2';

import starlightLinksValidator from 'starlight-links-validator';
import { GOOGLE_ANALYTICS } from './src/libs/head';
import {
  REAL_NUMBER,
  LINEAR_ALGEBRA,
  MATHEMATICS,
  MATH_DIALY,
  SOFTWARE,
  ABOUT_MY_WEBSITE,
  HIGH_SCHOOL_MATH,
  LINEAR_ALGEBRA_KAWAKUBO,
  MCGRAW_HILL_CALCULUS_UPPER,
  OTHER_THAN_MATH
} from './src/libs/sidebar';

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
    head: [
      ...GOOGLE_ANALYTICS,
    ],
    plugins: [starlightLinksValidator()],
    title: '数学の主張',
    components: {
      // オーバーライド
      Footer: './src/components/starlight/Footer.astro',
      Head: './src/components/starlight/Head.astro',
      TableOfContents: './src/components/starlight/TableOfContents.astro',
      Sidebar: './src/components/starlight/Sidebar.astro',
      MarkdownContent: './src/components/starlight/MarkdownContent.astro',
    },
    tableOfContents: true,
    lastUpdated: true,
    disable404Route: true,
    //i18n: {
    //  routing: {
    //    prefixDefaultLocale: false,
    //  }
    //},
    customCss: ['./src/styles/custom.css'],
    social: [
      { icon: 'github', label: 'GitHub', href: 'https://github.com/tomohikoseven' },
      { icon: 'x.com', label: 'X', href: 'https://x.com/tomohikoseven' },
      { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/nagasetomohiko/' },
    ],
    sidebar: [
      REAL_NUMBER,
      MCGRAW_HILL_CALCULUS_UPPER,
      LINEAR_ALGEBRA,
      LINEAR_ALGEBRA_KAWAKUBO,
      MATHEMATICS,
      MATH_DIALY,
      HIGH_SCHOOL_MATH,
      SOFTWARE,
      OTHER_THAN_MATH,
      ABOUT_MY_WEBSITE
    ]
  }),
  d2(),
  sitemap()],
  markdown: {
    remarkPlugins: [remarkMath, emoji],
    rehypePlugins: [rehypeTypst],
  }
});
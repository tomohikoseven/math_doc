import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import starlightLinksValidator from 'starlight-links-validator';
import { KATEX, GOOGLE_ADSENSE, GOOGLE_ANALYTICS, BUY_ME_A_COFFEE } from './src/libs/head';

// https://astro.build/config
export default defineConfig({
  site: 'https://math-doc.pages.dev',
  integrations: [starlight({
    head:[
     KATEX, 
     GOOGLE_ADSENSE, 
     ...GOOGLE_ANALYTICS,
      BUY_ME_A_COFFEE,
    ],
    plugins: [starlightLinksValidator()],
    title: '数学の主張',
    tableOfContents: false, 
    customCss: [ './src/styles/custom.css' ] ,
    defaultLocale: 'ja',
    locales: {
      ja: {
        label: '日本語'
      }
    }, 
    social: {
      github: 'https://github.com/tomohikoseven',
      'x.com': 'https://x.com/tomohikoseven'
    },
    sidebar: [
    {
      label: '実数論',
      autogenerate : {
        directory: 'real_number',
        collapsed: true,
      }
    }, 
    {
      label: '線形代数',
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
    }]
  })],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [ [rehypeKatex, {strict: true}] ],
  }
});
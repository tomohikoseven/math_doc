import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://math-doc.pages.dev',
  integrations: [starlight({
    head:[
      {
        tag:'meta',
        attrs:{
          name: 'google-site-verification',
          content: 'EC7D-cNrvKzXzsz8OePb5W1ZKSZ_-Bb5pTv9iMELkRE'
        },
      },
      {
        tag:'link',
        attrs:{
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
          integrity: 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
          crossorigin: 'anonymous'
        }
      },
    ],
    title: '数学の主張',
    social: {
      github: 'https://github.com/tomohikoseven',
      'x.com': 'https://x.com/tomohikoseven'
    },
    sidebar: [{
      label: '実数論',
      autogenerate : {
        directory: 'real_number',
        collapsed: true,
      }
    }, {
      label: 'Software',
      autogenerate: {
        directory: 'software',
        collapsed: true,
      }
    }]
  }), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  }
});
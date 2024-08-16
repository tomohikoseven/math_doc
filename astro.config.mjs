import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import starlightLinksValidator from 'starlight-links-validator';

// https://astro.build/config
export default defineConfig({
  site: 'https://math-doc.pages.dev',
  integrations: [starlight({
    head:[
      // Katex css
      {
        tag:'link',
        attrs:{
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
          integrity: 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
          crossorigin: 'anonymous'
        }
      },
      // Google Analytics 
      {
        tag: `script`,
        attrs: {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-5RMK9LFJWN',
        }
      },
      {
        tag: 'script',
        content: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-5RMK9LFJWN');
 `
      },
      // Google Adsence 
      {
        tag: 'meta',
        attrs: {
          name: 'google-adsense-account',
          content: 'ca-pub-7031713239242378'
        }
      }
    ],
    plugins: [starlightLinksValidator()],
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
  })],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  }
});
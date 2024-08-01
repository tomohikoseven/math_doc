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
    ],
    title: '数学の主張',
    social: {
      github: 'https://github.com/tomohikoseven',
      'x.com': 'https://x.com/tomohikoseven'
    },
    sidebar: [{
      label: '実数論',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Example Guide',
        slug: 'guides/example'
      }]
    }, {
      label: 'Software',
      autogenerate: {
        directory: 'reference'
      }
    }]
  }), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});
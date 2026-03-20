import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import emoji from 'remark-emoji';
import rehypeTypst from '@myriaddreamin/rehype-typst';
import { typst } from 'astro-typst';
import d2 from 'astro-d2';

import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightLinksValidator from 'starlight-links-validator';
import { GOOGLE_ANALYTICS } from './src/libs/head';
import {
  MATHEMATICS_GROUP,
  MATH_DIALY,
  SOFTWARE,
  ABOUT_MY_WEBSITE,
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
    plugins: [
      starlightLinksValidator(),
      starlightSidebarTopics([
        {
          label: '数学',
          link: '/math/real_number/',
          icon: 'open-book',
          items: MATHEMATICS_GROUP.items,
        },
        {
          label: '読書・学習・ライフ',
          link: '/learning/0500_improve_memory/',
          icon: 'sun',
          items: [OTHER_THAN_MATH],
        },
        {
          label: '数学日誌',
          link: '/diary/202501/',
          icon: 'pencil',
          items: [MATH_DIALY],
        },
        {
          label: 'Software',
          link: '/software/zexample/',
          icon: 'laptop',
          items: [SOFTWARE],
        }
      ], {
        exclude: ['/typst_test', '/typst_test_simple', '/thank_you_for_your_inquiry', '/index', '/about/**/*']
      })
    ],
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
    ]
  }),
  typst({
    target: (id) => "svg"
  }),
  d2(),
  sitemap()],
  markdown: {
    remarkPlugins: [remarkMath, emoji],
    rehypePlugins: [rehypeTypst],
  }
});
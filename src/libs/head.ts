/**
 * サイトの <head> タグ内に挿入するカスタム要素の定義モジュール
 * Google Analytics や Buy Me a Coffee などの外部スクリプトのタグ情報をエクスポートします。
 */

/** Google Analytics (GA4) 用のトラッキングタグ設定 */
export const GOOGLE_ANALYTICS = [
  {
    tag: `script`,
    attrs: {
      type: 'text/partytown',
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-GLTH0LBWDY',
    }
  },
  {
    tag: 'script',
    attrs: {
      type: 'text/partytown',
    },
    content: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-GLTH0LBWDY');
    `
  }
];

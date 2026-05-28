/**
 * サイトの <head> タグ内に挿入するカスタム要素の定義モジュール
 * Google Analytics や Buy Me a Coffee などの外部スクリプトのタグ情報をエクスポートします。
 */

/** Google Analytics (GA4) 用のトラッキングタグ設定 */
export const GOOGLE_ANALYTICS = [
  {
    tag: `script`,
    attrs: {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-GLTH0LBWDY',
    }
  },
  {
    tag: 'script',
    content: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-GLTH0LBWDY');
    `
  }
];

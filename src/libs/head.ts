// Katex CSS
export const KATEX = {
        tag:'link',
        attrs:{
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
          integrity: 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
          crossorigin: 'anonymous'
        }
      };

// Google Adsence
export const GOOGLE_ADSENSE = {
        tag: 'meta',
        attrs: {
          name: 'google-adsense-account',
          content: 'ca-pub-7031713239242378'
        }
      };

// Google Analytics
export const GOOGLE_ANALYTICS = [{
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
      }];

export const BUY_ME_A_COFFEE = {
    tag: 'script',
    attrs: {
        'data-name': 'BMC-Widget',
        'data-cfasync': 'false',
        src: 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js',
        'data-id': 'tomohiko',
        'data-description': 'Support me on Buy me a coffee!' ,
        'data-message': '',
        'data-color': '#5F7FFF',
        'data-position': 'Right',
        'data-x_margin': '18',
        'data-y_margin': '18',
    }
};

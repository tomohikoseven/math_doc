
// Google Analytics
export const GOOGLE_ANALYTICS = [{
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
}];

export const BUY_ME_A_COFFEE = {
  tag: 'script',
  attrs: {
    'data-name': 'BMC-Widget',
    'data-cfasync': 'false',
    src: 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js',
    'data-id': 'tomohiko',
    'data-description': 'Support me on Buy me a coffee!',
    'data-message': '',
    'data-color': '#5F7FFF',
    'data-position': 'Right',
    'data-x_margin': '18',
    'data-y_margin': '18',
  }
};

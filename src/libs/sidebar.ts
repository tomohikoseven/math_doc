/**
 * Starlightのサイドバーとトピック設定の定義モジュール
 * starlight-sidebar-topics プラグイン等と連携して使用します。
 */

/**
 * 指定されたディレクトリから自動生成されるサイドバーグループを生成するヘルパー関数
 * @param label - サイドバーに表示されるラベル
 * @param directory - 自動生成対象のディレクトリパス
 * @returns StarlightのSidebarItem形式のオブジェクト
 */
function createAutoGroup(label: string, directory: string) {
  return {
    label,
    collapsed: true,
    items: [{ autogenerate: { directory, collapsed: true } }]
  };
}

export const REAL_NUMBER = createAutoGroup('実数論', 'real_number');
export const MCGRAW_HILL_CALCULUS_UPPER = createAutoGroup('マグロウヒル大学演習シリーズ 微積分（上）', 'McGraw_Hill_College_Exercise_Series_Calculus_Upper');
export const LINEAR_ALGEBRA = createAutoGroup('線形代数', 'linear_algebra');
export const LINEAR_ALGEBRA_KAWAKUBO = createAutoGroup('線形代数学 演習', 'linear_algebra_kawakubo');
export const MATHEMATICS = createAutoGroup('数学全般', 'other');
export const MATH_DIALY = {
  ...createAutoGroup('数学日誌', 'diary'),
  badge: { text: 'Archive', class: 'badge-archive' },
};
export const SOFTWARE = {
  label: 'Software',
  collapsed: true,
  items: [
    createAutoGroup('Astro', 'software/astro'),
    createAutoGroup('ブラウザ自動操作', 'software/browser_automation'),
    createAutoGroup('楽天', 'software/Rakuten'),
    createAutoGroup('その他', 'software/other'),
    {
      ...createAutoGroup('Raspberry Pi', 'software/raspberrypi'),
      badge: { text: 'Archive', class: 'badge-archive' },
    },
  ]
};
export const HIGH_SCHOOL_MATH = createAutoGroup('高校数学', 'high_school_math');
export const OTHER_THAN_MATH = createAutoGroup('読書・学習・ライフ', 'learning');

// ─── 数学カテゴリをまとめたグループ ───────────────────────────
export const MATHEMATICS_GROUP = {
  label: '数学',
  collapsed: false,
  items: [
    createAutoGroup('実数論', 'math/real_number'),
    createAutoGroup('微分法', 'math/differential_method'),
    createAutoGroup('積分法', 'math/integral_method'),
    createAutoGroup('線形代数', 'math/linear_algebra'),
    createAutoGroup('微積分 演習', 'math/calculus'),
    createAutoGroup('高校数学', 'math/high_school'),
    {
      ...createAutoGroup('数学の基盤と構造', 'math/structures'),
      badge: { text: 'HOT', variant: 'danger' },
    },
    createAutoGroup('数学エッセイ', 'math/essays'),
    MATH_DIALY,
  ],
};

// ─── サイドバーのトピック設定 (starlight-sidebar-topics) ───────────
export const SIDEBAR_TOPICS = [
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
    badge: { text: 'HOT', variant: 'danger' },
    items: [OTHER_THAN_MATH],
  },
  {
    label: 'Software',
    link: '/software/astro/astro_components_steps/',
    icon: 'laptop',
    items: SOFTWARE.items,
  },
];

/**
 * リンクチェッカー（starlight-links-validator）等で除外するパスの設定
 */
export const SIDEBAR_TOPICS_OPTIONS = {
  exclude: [
    '/thank_you_for_your_inquiry',
    '/index',
    '/about/**/*'
  ]
};
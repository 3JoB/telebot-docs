// .vitepress/config.ts
import { sidebar_en } from "./sidebar_en";
import { sidebar_ru } from "./sidebar_ru";
import { sidebar_zhtw } from "./sidebar_zhtw";

export default {
  title: "TelebotE",
  description: "A Telegram bot framework in Go",
  rewrites: {
    //'zh/index.md': 'zh.md',
    //'zh/guide/api/(.*)': 'zh/guide/api-(.*)',
    //'zh/guide/interface/(.*)': 'zh/guide/interface-(.*)',
  },
  head: [
    [
      'link', { rel: 'icon', href: '/telebot.ico' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap', rel: 'stylesheet' }
    ],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-Q8F93M298K' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Q8F93M298K');`
    ]
  ],
  cleanUrls: true,
  ignoreDeadLinks: true,
  cache: true,

  locales: {
    root: {
      label: "English",
      lang: "en_US",
      themeConfig: {
        sidebar: sidebar_en()
      }
    },
    zh: {
      label: "繁體中文",
      lang: "zh_tw",
      link: "/zh",
      themeConfig: {
        sidebar: sidebar_zhtw(),
        nav: [
          { text: "關於", link: "/about" },
          { text: "發行說明", link: "https://github.com/3JoB/telebot/releases" },
        ],
      },
    },
    ru: {
      label: "Russian",
      lang: "ru",
      link: "/ru",
      themeConfig: {
        sidebar: sidebar_ru(),
        nav: [
          { text: "около", link: "/about" },
          { text: "Примечания к выпуску", link: "https://github.com/3JoB/telebot/releases" },
        ],
      },
    },
  },

  themeConfig: {
    logo: "/telebot.ico",
    siteTitle: false,
    nav: [
      { text: "About", link: "/about" },
      { text: "Release", link: "https://github.com/3JoB/telebot/releases" },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/3JoB/telebot' },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "No Copyright | Just follow the MIT license.",
    },
  },
}
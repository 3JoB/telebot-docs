import { type DefaultTheme } from 'vitepress'

export function sidebar_zhtw(): DefaultTheme.Sidebar {
  return {
    '/zh/guide/': { base: '/zh/guide/', items: guide() },
  }
}

function guide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '介紹',
      collapsed: false,
      items: [
        { text: '概述', link: 'overview' },
        { text: '安裝', link: 'installation' },
        { text: '快速開始', link: 'getting-started' },
      ]
    },
    ...api(),
    ...interfaces(),
    ...usage(),
  ]
}

function api(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '方法',
      collapsed: true,
      base: '/zh/guide/api/',
      items: [
        { text: '情境', link: 'context' },
        { text: '中介軟體', link: 'middleware' },
        { text: '命令', link: 'command' },
        { text: '文件', link: 'file' },
        { text: '傳送', link: 'send' },
        { text: '編輯', link: 'edit' },
        { text: '鍵盤', link: 'keyboards' },
        { text: '內聯模式', link: 'inline-mode' },
      ]
    },
  ]
}

function interfaces(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '端口',
      collapsed: true,
      base: '/zh/guide/interface/',
      items: [
        { text: '紀錄', link: 'logger' },
        { text: 'Json', link: 'json' },
        { text: '網路', link: 'network' },
        { text: 'Poller', link: 'poller' },
      ]
    },
  ]
}

function usage(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '用法',
      collapsed: true,
      base: '/zh/guide/usage/',
      items: [
        { text: 'Webhook', link: 'webhook' },
      ]
    },
  ]
}
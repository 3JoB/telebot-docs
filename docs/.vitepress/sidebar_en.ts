import { type DefaultTheme } from 'vitepress'

export function sidebar_en(): DefaultTheme.Sidebar {
  return {
    '/guide/': { base: '/guide/', items: guide() }
  }
}

function guide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'Overview', link: 'overview' },
        { text: 'Installation', link: 'installation' },
        { text: 'Getting Started', link: 'getting-started' },
      ]
    },
    ...api(),
    ...interfaces(),
    ...migration(),
  ]
}

function api(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'API',
      collapsed: true,
      base: '/guide/api/',
      items: [
        { text: 'Context', link: 'context' },
        { text: 'Middleware', link: 'middleware' },
        { text: 'Command', link: 'command' },
        { text: 'File', link: 'file' },
        { text: 'Send', link: 'send' },
        { text: 'Edit', link: 'edit' },
        { text: 'Keyboards', link: 'keyboards' },
        { text: 'Inline Mode', link: 'inline-mode' },
      ]
    },
  ]
}

function interfaces(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Interface',
      collapsed: true,
      base: '/guide/interface/',
      items: [
        { text: 'Logger', link: 'logger' },
        { text: 'Json', link: 'json' },
        { text: 'Network', link: 'network' },
        { text: 'Poller', link: 'poller'},
      ]
    },
  ]
}

function migration(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Migration',
      collapsed: true,
      base: '/guide/migration/',
      items: [
        { text: 'Migration from TeleBot to TeleBotE', link: 't-to-te' },
        { text: 'Migration from v1 to v2', link: 'v1-to-v2' }
      ]
    },
  ]
}
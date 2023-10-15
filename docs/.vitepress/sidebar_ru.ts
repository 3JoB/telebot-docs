import { type DefaultTheme } from 'vitepress'

export function sidebar_ru(): DefaultTheme.Sidebar {
    return {
        '/ru/guide/': { base: '/ru/guide/', items: guide() },
    }
}

function guide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Введение',
            collapsed: false,
            items: [
                { text: 'Переопределить', link: 'overview' },
                { text: 'Установить', link: 'installation' },
                { text: 'начиная', link: 'getting-started' },
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
            text: 'метод',
            collapsed: true,
            base: '/ru/guide/api/',
            items: [
                { text: 'контекст', link: 'context' },
                { text: 'промежуточное программное обеспечение', link: 'middleware' },
                { text: 'команда', link: 'command' },
                { text: 'файл', link: 'file' },
                { text: 'отправлять', link: 'send' },
                { text: 'редактировать', link: 'edit' },
                { text: 'клавиатуры', link: 'keyboards' },
                { text: 'встроенный режим', link: 'inline-mode' },
            ]
        },
    ]
}

function interfaces(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'интерфейсы',
            collapsed: true,
            base: '/ru/guide/interface/',
            items: [
                { text: 'бревно', link: 'logger' },
                { text: 'Json', link: 'json' },
                { text: 'сеть', link: 'network' },
            ]
        },
    ]
}

function migration(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'миграция',
            collapsed: true,
            base: '/ru/guide/migration/',
            items: [
                { text: 'Переход с TeleBot на TeleBotE', link: 't-to-te' },
                { text: 'Миграция с версии 1 на версию 2', link: 'v1-to-v2' }
            ]
        },
    ]
}
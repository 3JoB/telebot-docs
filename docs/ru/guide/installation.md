---
title: Установить
layout: doc
---

# Установить

<script lang="ts" setup>
    import { data } from '../../install.data.ts'
</script>

::: info Коробка версии
Последняя версия: {{data.tag_name}}

Дата выхода: {{data.created_at}}

Примечания к выпуску: <a :href="data.html_url">{{data.html_url}}</a>
:::

Используйте Go Mod для установки Telebot. 

### v2
```bash-vue
$ go get github.com/3JoB/telebot/v2@{{data.tag_name}}
```

### v1
Версия 1 больше не поддерживается, поэтому, пожалуйста, перейдите на версию 2 как можно скорее.
```bash
$ go get github.com/3JoB/telebot
```
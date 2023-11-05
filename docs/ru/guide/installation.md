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

### v1
```bash-vue
$ go get gopkg.in/crare@{{data.tag_name}}
```
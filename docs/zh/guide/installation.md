---
title: 安裝
layout: doc
---

# 安裝

<script lang="ts" setup>
    import { data } from '../../install.data.ts'
</script>

::: info Version Box
最新版本: {{data.tag_name}}

發佈日期: {{data.created_at}}

發佈说明: <a :href="data.html_url">{{data.html_url}}</a>
:::

使用 Go Mod來安裝Telebot.

### v2
```bash-vue
$ go get github.com/3JoB/telebot/v2@{{data.tag_name}}
```

### v1
v1已不再提供支持，所以請盡快遷移到v2.
```bash
$ go get github.com/3JoB/telebot
```
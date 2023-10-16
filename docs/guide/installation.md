---
title: Installation
layout: doc
---

# Installation

<script lang="ts" setup>
    import { data } from '../install.data.ts'
</script>

::: info Version Box
Latest Version: {{data.tag_name}}

Release Date: {{data.created_at}}

Release Notes: <a :href="data.html_url">{{data.html_url}}</a>
:::

### v2
```bash-vue
$ go get github.com/3JoB/telebot/v2@{{data.tag_name}}
```

### v1
v1 is no longer supported, so please migrate to v2 as soon as possible.
```bash
$ go get github.com/3JoB/telebot
```
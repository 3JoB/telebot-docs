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

### v1
```bash-vue
$ go get gopkg.in/crare.v1@{{data.tag_name}}
```
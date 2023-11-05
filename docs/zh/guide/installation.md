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

### v1
```bash-vue
$ go get gopkg.in/crare@{{data.tag_name}}
```
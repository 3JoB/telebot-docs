---
title: Переопределить
layout: page
---
<script lang="ts" setup>
import { useRouter } from 'vitepress'
import { onMounted } from 'vue'

let { go } = useRouter()

onMounted(() => {
    go('/ru/guide/overview')
})
</script>
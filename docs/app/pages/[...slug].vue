<script setup lang="ts">
import { createError, useAsyncData, useRoute, useSeoMeta } from '#app'

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page not found: ${route.fullPath}`,
    data: {
      path: route.fullPath,
    },
  })
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
})
</script>

<template>
  <div v-if="page">
    <h1>{{ page.title }}</h1>
    <ContentRenderer :value="page" />
  </div>
</template>

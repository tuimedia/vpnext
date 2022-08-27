<script setup lang="ts">
const props = defineProps<{
  data: object;
}>();
</script>

<template>
  <div>
    <component
      v-if="props.data.title.length"
      :is="props.data.titleLevel === 'tertiary' ? 'h3' : 'h2'"
      >{{ props.data.title }}</component
    >

    <div v-html="props.data.copy" />
  </div>
</template>

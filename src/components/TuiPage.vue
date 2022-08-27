<script setup lang="ts">
import { provide, readonly, ref } from 'vue';

const props = defineProps<{
  data: object;
}>();

provide('TuiPage', readonly(props.data));
const rows = ref(props.data.rows);
</script>

<template>
  <article>
    <component v-for="block in rows" :key="block.id" :is="block.component" :data="block" />
  </article>
</template>

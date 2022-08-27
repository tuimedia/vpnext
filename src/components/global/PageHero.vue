<script setup lang="ts">
import { computed, inject } from 'vue';

const props = defineProps<{
  data: object;
}>();

const page = inject('TuiPage');
const metadata = computed(() => JSON.stringify(page.metadata));
</script>

<template>
  <div>
    <h1>{{ props.data.title }}</h1>
    <div>{{ metadata }}</div>
  </div>
</template>

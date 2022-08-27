<template>
  <div>
    <component v-for="block in blocks" :key="block.id" :is="block.component" :data="block" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';

const props = defineProps<{
  data: object;
}>();

const page = inject('TuiPage');
const blocks = computed(() => {
  return props.data.blocks.map((id) => page.blocks[id]);
});
</script>

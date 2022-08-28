<script setup lang="ts">
import { computed, provide } from 'vue';
import { TuiPageKey, useTuiPage } from './tuipage';
import type { TuiPageData } from '../types';
import type { WritableComputedRef } from 'vue';

const $emit = defineEmits(['update:lang', 'update:page']);

const props = defineProps<{
  page: TuiPageData;
  lang: string;
}>();

const page: WritableComputedRef<TuiPageData> = computed({
  get() {
    return props.page;
  },
  set(val) {
    $emit('update:page', val);
  },
});
const lang: WritableComputedRef<string> = computed({
  get() {
    return props.lang;
  },
  set(val) {
    $emit('update:lang', val);
  },
});

const TuiPage = useTuiPage(page, lang);
provide(TuiPageKey, TuiPage);

const blocks = computed(() =>
  page.value.pageData.content.layout.map((id) => page.value.pageData.content.blocks[id]),
);
</script>

<template>
  <article>
    <component v-for="block in blocks" :key="block.id" :is="block.component" :data="block" />
  </article>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import { TuiPageKey, useTuiPage } from '../vue-page';
import type { TuiPageData } from '../vue-page';
import type { ComputedRef } from 'vue';

const props = defineProps<{
  page: TuiPageData;
  lang: string;
}>();

const page: ComputedRef<TuiPageData> = computed(() => props.page);
const lang: ComputedRef<string> = computed(() => props.lang);

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

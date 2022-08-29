<script setup lang="ts">
import { computed, inject } from 'vue';
import { TuiPageKey, type InjectedTuiPage, type TuiPageBlock } from '../../vue-page';

const props = defineProps<{
  data: TuiPageBlock;
}>();

/* This block renders children, so we need to inject the TuiPage utility to
 * retrieve the whole page object.
 * Note that most pages, you don't need "row" blocks like this. You can just
 * throw a bunch of block ids into page.pageData.content.layout, like in
 * public/sample5.json
 */
const TuiPage = inject(TuiPageKey) as InjectedTuiPage;
const blocks = computed(() =>
  props.data.children.map((id) => TuiPage.page.value.pageData.content.blocks[id]),
);
</script>

<template>
  <div>
    <component v-for="block in blocks" :key="block.id" :is="block.component" :data="block" />
  </div>
</template>

<template>
  <div>
    <component v-for="block in blocks" :key="block.id" :is="block.component" :data="block" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { TuiPageKey } from '../../vue-page';
import type { InjectedTuiPage, TuiPageBlock } from '../../vue-page';

const props = defineProps<{
  data: TuiPageBlock;
}>();

const TuiPage = inject(TuiPageKey) as InjectedTuiPage;
const blocks = computed(() =>
  props.data.children.map((id) => TuiPage.page.value.pageData.content.blocks[id]),
);
</script>

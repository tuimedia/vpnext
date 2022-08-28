<script setup lang="ts">
import { TuiPageKey } from '../../vue-page';
import { inject } from 'vue';
import type { InjectedTuiPage, TuiPageBlock } from '../../vue-page';

const props = defineProps<{
  data: TuiPageBlock;
}>();

const TuiPage = inject(TuiPageKey) as InjectedTuiPage;
const strings = TuiPage.translateBlockStrings(props.data);
</script>

<template>
  <div>
    <component v-if="strings?.title?.length" :is="strings.titleLevel === 'tertiary' ? 'h3' : 'h2'">
      {{ strings.title }}
    </component>

    <div v-html="strings.copy" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { TuiPageKey, type InjectedTuiPage, type TuiPageBlock } from '../../vue-page';

const props = defineProps<{
  data: TuiPageBlock;
}>();

// Get the TuiPage utility and use it to calculate the strings to show
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

<script setup lang="ts">
import { inject, computed } from 'vue';
import { TuiPageKey } from '../../vue-page';
import type { InjectedTuiPage, TuiPageBlock } from '../../vue-page';

const props = defineProps<{
  data: TuiPageBlock;
}>();

const TuiPage = inject(TuiPageKey) as InjectedTuiPage;
const strings = TuiPage.translateBlockStrings(props.data);
const heroImage = computed(
  () =>
    `url(${TuiPage.page.value.pageData.metadata.data.heroImage}?auto=format,compress&w=1600&h=600&fit=crop&crop=faces,edges)`,
);
</script>

<template>
  <div class="hero">
    <h1>{{ strings.title }}</h1>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: end;
  min-height: 300px;
  background-size: contain, cover;
  background-blend-mode: multiply;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%),
    v-bind(heroImage);
}

.hero h1 {
  padding: 0 1rem;
  font-family: sans-serif;
  color: white;
}
</style>

<script setup lang="ts">
import { inject, computed } from 'vue';
import { TuiPageKey, type InjectedTuiPage, type TuiPageBlock } from '../../vue-page';

const props = defineProps<{
  data: TuiPageBlock;
}>();

/* The "as InjectedTuiPage" here is because otherwise the type would be
 * <InjectedTuiPage|null>. That would be true if you ever used this component
 * outside of a TuiPage component tree, but inside it, it's always set
 */
const TuiPage = inject(TuiPageKey) as InjectedTuiPage;

// Get the strings for the currently selected language, with fallback to default
const strings = TuiPage.translateBlockStrings(props.data);

// Get the metadata + metadata strings for the currently selected language, with fallback to default
const metadata = TuiPage.translateMetadata();

// Use it
const heroImage = computed(
  () =>
    `url(${metadata.value.heroImage}?auto=format,compress&w=1600&h=600&fit=crop&crop=faces,edges)`,
);

/* Demonstrate modifying the global language from within the component tree
 * Note: this only works if the <TuiPage> parent tag uses v-model:lang, because
 * the language value is originally a read-only prop, so we must emit changes.
 */
function toggleLanguage() {
  TuiPage.language.value = TuiPage.language.value === 'en' ? 'es' : 'en';
}
</script>

<template>
  <div class="hero">
    <h1>{{ strings.title }}</h1>
    <button @click="toggleLanguage">Toggle language</button>
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

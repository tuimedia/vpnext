<script setup lang="ts">
import { ref, watch } from 'vue';
import TuiPage from './components/TuiPage.vue';
import usePage from './vue-page';

const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);
const language = ref('en_GB');
const tuiPage = usePage({ editable: true });
const tuiPage2 = usePage();

watch(language, (val) => tuiPage.setLanguage(val));

fetch('/sample.json')
  .then((r) => r.json())
  .then((page) => {
    tuiPage.setPage(page);
    tuiPage.setLanguage(language.value);
    tuiPage2.setPage(page);
    tuiPage2.setLanguage('en_GB');
  });

function toggleLanguage() {
  language.value = language.value === 'en_GB' ? 'es' : 'en_GB';
}

function addBlock() {
  const editor = tuiPage.editor;
  const row = tuiPage.rows.value[0];

  const block = {
    id: uid(),
    component: 'PageText',
    languages: tuiPage.page.value.pageData.availableLanguages,
  };
  const langData = {
    title: '',
    copy: `${block.id} Esse sit excepteur consequat labore amet magna officia occaecat adipisicing reprehenderit eu magna aliqua. Consectetur sunt irure eu aliqua adipisicing aliquip. Exercitation in ipsum cillum anim. Aute in incididunt labore incididunt excepteur consectetur ipsum. Ad id adipisicing tempor tempor dolore incididunt. Nisi eu minim sunt id proident enim ex non incididunt. Lorem sit aliqua irure excepteur aliqua sit est minim adipisicing consequat laborum est non ut.`,
  };

  editor.setBlockData({ id: block.id, value: block });
  editor.setBlockLangData({
    language: 'en_GB',
    id: block.id,
    value: langData,
  });
  editor.setBlockData({ id: row.id, key: 'blocks', value: [...row.blocks, block.id] });
}
</script>

<template>
  <div id="app">
    <h2>What's going on here?</h2>
    <ul>
      <li>This is a proof of concept of a vuex-less version of @tuimedia/vue-page</li>
      <li>Two TuiPage components on the same page, each with its own state</li>
      <li>Editor functionality only added on demand (<code>{ editable: true }</code>)</li>
      <li
        >Editor functions can be imported separately and mutate a plain page object or ref, so you
        could call these from vuex mutations if you want, or modify a page object without setting up
        a TuiPage</li
      >
      <li
        >TuiPage object <code>provide</code>d into component tree by the TuiPage tag, can be
        <code>inject</code>ed into child components when access is needed to metadata, the page
        object, etc</li
      >
      <li>The normal vue-page features: e.g. language switching, fallback to default language</li>
      <li
        >Storing page state is now your business, not the TuiPage component's. You could keep it in
        vuex if you wanted.</li
      >
    </ul>
    <h2>What's crappy</h2>
    <ul>
      <li
        >I have even less idea how and when to use <code>.value</code> than with
        @vue/composition-api (it's not in the same places)
      </li>
    </ul>
    <hr />
    <button @click.prevent="toggleLanguage">Language {{ language }}</button>
    <button @click.prevent="addBlock">Add block</button>
    <div :class="$style.twoup">
      <TuiPage v-if="tuiPage" :data="tuiPage" />
      <TuiPage v-if="tuiPage2" :data="tuiPage2" />
    </div>
  </div>
</template>

<style module>
.twoup {
  display: flex;
}
.twoup > * + * {
  margin-left: 1rem;
  border-left: 1px solid silver;
  padding-left: 1rem;
}
</style>

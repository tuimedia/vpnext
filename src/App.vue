<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { TuiPageBlock, TuiPageData } from './vue-page';

const language = ref('en');

// Create a page reference and load some data into it
const tuiPage: Ref<TuiPageData | null> = ref(null);
fetch(`${import.meta.env.BASE_URL}sample4.json`)
  .then((r) => r.json())
  .then((page) => {
    tuiPage.value = page;
  });

// Create a page reference and load some data into it
const tuiPage2: Ref<TuiPageData | null> = ref(null);
fetch(`${import.meta.env.BASE_URL}sample5.json`)
  .then((r) => r.json())
  .then((page) => {
    tuiPage2.value = page;
  });

// Demo stuff to test reactivity: toggle language, add a block
function toggleLanguage() {
  language.value = language.value === 'en' ? 'es' : 'en';
}

const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);
function addBlock() {
  if (!tuiPage?.value) {
    return;
  }
  const blockId = uid();
  const block: TuiPageBlock = {
    id: blockId,
    component: 'PageText',
    children: [],
    data: {
      titleLevel: 'secondary',
    },
    strings: {
      en: {
        title: '',
        copy: `${blockId} Esse sit excepteur consequat labore amet magna officia occaecat adipisicing reprehenderit eu magna aliqua. Consectetur sunt irure eu aliqua adipisicing aliquip. Exercitation in ipsum cillum anim. Aute in incididunt labore incididunt excepteur consectetur ipsum. Ad id adipisicing tempor tempor dolore incididunt. Nisi eu minim sunt id proident enim ex non incididunt. Lorem sit aliqua irure excepteur aliqua sit est minim adipisicing consequat laborum est non ut.`,
      },
    },
  };

  tuiPage.value.pageData.content.blocks[blockId] = block;
  tuiPage.value.pageData.content.layout.push(blockId);
}
</script>

<template>
  <div id="app">
    <h2>What's going on here?</h2>
    <ul>
      <li>This is a proof of concept of a vuex-less version of @tuimedia/vue-page</li>
      <li>
        This uses schemaVersion 4; a CLI node script is provided to convert from v2. V4 has
        typescript definitions instead of JSON Schema. It keeps each block and its strings together.
        Metadata is split into data and strings objects. Blocks have a consistent definition, with
        "data" and "strings" objects for custom data.
      </li>
      <li>Two TuiPage components on the same page, each with its own state</li>
      <li>
        TuiPage convenience object <code>provide</code>d into component tree by the TuiPage tag, can
        be <code>inject</code>ed into child components when access is needed to metadata, the page
        object, etc
      </li>
      <li>Typescript types provided</li>
      <li>The normal vue-page features: e.g. language switching, fallback to default language</li>
      <li>
        Thanks to Vue 3's proxy-based reactivity, can just edit the page object directly without the
        bothersome editor functions. Keeping strings within the block also makes editing more
        straightforward.
      </li>
      <li>
        Storing page state is now your business, not the TuiPage component's. You could still keep
        it in vuex if you wanted.
      </li>
    </ul>
    <h2>What's crappy</h2>
    <ul>
      <li>No one understands it yet</li>
      <li>It's quite different from before</li>
      <li>It's not <em>much</em> less complex</li>
      <li>There's no tuimedia/page-bundle support for schemaVersion 4 yet</li>
    </ul>
    <hr />
    <button @click.prevent="toggleLanguage">Language {{ language }}</button>
    <button @click.prevent="addBlock">Add block</button>
    <div :class="$style.twoup">
      <!-- You don't HAVE to use v-model, but if you don't, then changes
        -- (like the page hero language button) aren't emitted back out, and
        -- only changes from outside the component tree (e.g. addBlock,
        -- toggleLanguage) will work.
        -->
      <TuiPage v-if="tuiPage" v-model:page="tuiPage" v-model:lang="language" />
      <TuiPage v-if="tuiPage2" v-model:page="tuiPage2" v-model:lang="language" />
    </div>
  </div>
</template>

<style module>
.twoup {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.twoup > * + * {
  margin-left: 1rem;
  border-left: 1px solid silver;
  padding-left: 1rem;
}
</style>

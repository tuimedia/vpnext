<template>
  <div id="app">
    <h2>What's going on here?</h2>
    <ul>
      <li>This is a proof of concept of a vuex-less version of @tuimedia/vue-page</li>
      <li>Two TuiPage components on the same page, each with its own state</li>
      <li>Editor functionality only added on demand (<code>{ editable: true }</code>)</li>
      <li>Editor functions can be imported separately and mutate a plain page object or ref, so you could call these from vuex mutations if you want, or modify a page object without setting up a TuiPage</li>
      <li>TuiPage object <code>provide</code>d into component tree by the TuiPage tag, can be <code>inject</code>ed into child components when access is needed to metadata, the page object, etc</li>
      <li>The normal vue-page features: e.g. language switching, fallback to default language</li>
      <li>Storing page state is now your business, not the TuiPage component's. You could keep it in vuex if you wanted.</li>
    </ul>
    <h2>What's crappy</h2>
    <ul>
      <li>It's composition-api, so on the plus side it should work in Vue 3, but on the minus side there's <code>.value</code> crap everywhere</li>
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

<script>
import TuiPage from './components/TuiPage.vue';
import usePage from './vue-page';

const uuid = (a) => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);

export default {
  components: {
    TuiPage,
  },
  data() {
    return {
      tuiPage: usePage({ editable: true }),
      tuiPage2: usePage(),
      language: 'en_GB',
    };
  },
  watch: {
    language(val) {
      this.tuiPage.setLanguage(val);
    },
  },
  async created() {
    const page = await fetch('/sample.json').then(r => r.json());
    this.tuiPage.setPage(page);
    this.tuiPage.setLanguage(this.language);
    this.tuiPage2.setPage(page);
    this.tuiPage2.setLanguage('en_GB');
  },
  methods: {
    toggleLanguage() {
      this.language = this.language === 'en_GB' ? 'es' : 'en_GB';
    },
    addBlock() {
      const editor = this.tuiPage.editor;
      const row = this.tuiPage.rows.value[0];

      const block = {
        id: uuid(),
        component: 'PageText',
        languages: this.tuiPage.page.value.pageData.availableLanguages,
      };
      const langData = {
        title: '',
        copy: `${block.id} Esse sit excepteur consequat labore amet magna officia occaecat adipisicing reprehenderit eu magna aliqua. Consectetur sunt irure eu aliqua adipisicing aliquip. Exercitation in ipsum cillum anim. Aute in incididunt labore incididunt excepteur consectetur ipsum. Ad id adipisicing tempor tempor dolore incididunt. Nisi eu minim sunt id proident enim ex non incididunt. Lorem sit aliqua irure excepteur aliqua sit est minim adipisicing consequat laborum est non ut.`
      }

      editor.setBlockData({ id: block.id, value: block });
      editor.setBlockLangData({
        language: 'en_GB',
        id: block.id,
        value: langData,
      });
      editor.setBlockData({ id: row.id, key: 'blocks', value: [...row.blocks, block.id]});
    },
  },
};
</script>

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

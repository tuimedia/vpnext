import { ref, computed } from 'vue';
import * as editorFunctions from './editor';

export default function usePage({ editable = false } = {}) {
  const page = ref({});
  const language = ref('en');

  function translateBlock(id) {
    return {
      ...page.value.pageData.content.blocks[id],
      ...page.value.pageData.content.langData[page.value.pageData.defaultLanguage][id],
      ...page.value.pageData.content.langData[language.value]?.[id],
    };
  }

  const blocks = computed(() => {
    const translatedBlocks = {};
    Object.keys(page.value?.pageData?.content?.blocks || {}).forEach(id => {
      translatedBlocks[id] = translateBlock(id);
    })

    return translatedBlocks;
  });

  const metadata = computed(() => ({
    ...page.value.pageData.metadata,
    ...page.value.pageData.content.langData[page.value.pageData.defaultLanguage]?.metadata,
    ...page.value.pageData.content.langData[language.value]?.metadata,
  }));

  const rows = computed(() => (page.value?.pageData?.content?.layout || []).map(id => blocks.value[id]));

  function setPage(value) {
    // TODO: check schemaVersion
    page.value = typeof value === 'object' ? JSON.parse(JSON.stringify(value)) : {};
  }

  function setLanguage(value) {
    language.value = value;
  }

  const partial = (fn, ...a) => (...b) => fn(...a, ...b);

  return {
    blocks,
    language: computed(() => language.value),
    metadata,
    page: computed(() => page.value),
    rows,
    setPage,
    setLanguage,
    // Add an editor object if the editable option is set, providing the page as the first argument to each function
    ...editable && {
        editor: Object.keys(editorFunctions).reduce((editor, functionName) => {
        editor[functionName] = partial(editorFunctions[functionName], page);
        return editor;
      }, {}),
    },
  };
}

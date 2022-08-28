import { computed } from 'vue';
import type { InjectionKey, Ref, ComputedRef } from 'vue';
// import * as editorFunctions from './editor';

export const TuiPageKey = Symbol() as InjectionKey<InjectedTuiPage>;

export function translateBlockStrings(
  block: TuiPageBlock,
  lang: string,
  fallbackLang = 'en',
): TuiPageStrings {
  const strings = Object.create(null);
  Object.assign(strings, block.strings[fallbackLang]);
  if (fallbackLang !== lang) {
    Object.assign(strings, block.strings[lang]);
  }
  return strings;
}

export function useTuiPage(page: Ref<TuiPageData>, language: Ref<string>): InjectedTuiPage {
  return {
    page,
    language,
    translateBlockStrings(block: TuiPageBlock): ComputedRef<TuiPageStrings> {
      return computed(() =>
        translateBlockStrings(block, language.value, page.value.pageData.defaultLanguage),
      );
    },
  };
}

// const blankPage = {
//   id: '',
//   slug: '',
//   state: '',
//   pageData: {
//     revision: '',
//     previousRevision: '',
//     defaultLanguage: '',
//     availableLanguages: [],
//     created: '',
//     content: {
//       schemaVersion: 4,
//       layout: [],
//       blocks: {},
//     },
//     metadata: { data: {}, strings: {} },
//   },
//   tagData: [],
// };

// export default function usePage({ editable = false } = {}) {
//   const page = ref({});
//   const language = ref('en');

//   function translateBlock(id) {
//     return {
//       ...page.value.pageData.content.blocks[id],
//       ...page.value.pageData.content.langData[page.value.pageData.defaultLanguage][id],
//       ...page.value.pageData.content.langData[language.value]?.[id],
//     };
//   }

//   const blocks = computed(() => {
//     const translatedBlocks = {};
//     Object.keys(page.value?.pageData?.content?.blocks || {}).forEach((id) => {
//       translatedBlocks[id] = translateBlock(id);
//     });

//     return translatedBlocks;
//   });

//   const metadata = computed(() => ({
//     ...page.value.pageData.metadata,
//     ...page.value.pageData.content.langData[page.value.pageData.defaultLanguage]?.metadata,
//     ...page.value.pageData.content.langData[language.value]?.metadata,
//   }));

//   const rows = computed(() =>
//     (page.value?.pageData?.content?.layout || []).map((id) => blocks.value[id]),
//   );

//   function setPage(value) {
//     // TODO: check schemaVersion
//     page.value = typeof value === 'object' ? JSON.parse(JSON.stringify(value)) : {};
//   }

//   function setLanguage(value) {
//     language.value = value;
//   }

//   const partial =
//     (fn, ...a) =>
//     (...b) =>
//       fn(...a, ...b);

//   return {
//     blocks,
//     language: computed(() => language.value),
//     metadata,
//     page: computed(() => page.value),
//     rows,
//     setPage,
//     setLanguage,
//     // Add an editor object if the editable option is set, providing the page as the first argument to each function
//     ...(editable && {
//       editor: Object.keys(editorFunctions).reduce((editor, functionName) => {
//         editor[functionName] = partial(editorFunctions[functionName], page);
//         return editor;
//       }, {}),
//     }),
//   };
// }

export interface InjectedTuiPage {
  page: Ref<TuiPageData>;
  language: Ref<string>;
  translateBlockStrings: (block: TuiPageBlock) => ComputedRef<TuiPageStrings>;
}

export interface TuiPageData {
  id: string;
  slug: string;
  state: string;
  pageData: {
    revision: string;
    previousRevision: string;
    defaultLanguage: string;
    availableLanguages: string[];
    created: string;
    content: {
      schemaVersion: number;
      layout: string[];
      blocks: {
        [k: string]: TuiPageBlock;
      };
    };
    metadata: TuiPageMetadata;
  };
  tagData: TuiPageTag[];
}

export interface TuiPageBlock {
  id: string;
  component: string;
  data: TuiPageDataStore;
  children: string[];
  strings: {
    [k: string]: TuiPageStrings;
  };
}

export interface TuiPageStrings {
  [k: string]: string;
}

export interface TuiPageMetadata {
  data: TuiPageDataStore;
  strings: TuiPageStrings;
}

export interface TuiPageTag {
  id: string;
  title: string;
  slug: string;
  type: string;
  data: TuiPageDataStore;
}

export interface TuiPageDataStore {
  [k: string]: any;
}

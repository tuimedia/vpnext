import { computed } from 'vue';
import type { InjectionKey, Ref, ComputedRef } from 'vue';
import type {
  InjectedTuiPage,
  TuiPageBlock,
  TuiPageData,
  TuiPageDataStore,
  TuiPageMetadata,
  TuiPageStrings,
} from '../types';

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

export function createPage(): TuiPageData {
  return {
    id: '',
    slug: '',
    state: '',
    pageData: {
      revision: '',
      previousRevision: '',
      defaultLanguage: '',
      availableLanguages: [],
      created: '',
      content: {
        schemaVersion: 4,
        layout: [],
        blocks: {},
      },
      metadata: { data: {}, strings: {} },
    },
    tagData: [],
  };
}

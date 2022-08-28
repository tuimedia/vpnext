import { computed } from 'vue';
import type { InjectionKey, Ref, ComputedRef } from 'vue';

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
      blocks: Record<string, TuiPageBlock>;
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
  strings: Record<string, TuiPageStrings>;
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
  [k: string]: unknown;
}

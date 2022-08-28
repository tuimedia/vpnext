import type { ComputedRef } from 'vue';

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
  strings: Record<string, TuiPageStrings>;
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

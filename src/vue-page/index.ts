import type { App } from 'vue';
import TuiPage from './src/TuiPage.vue';

export type {
  InjectedTuiPage,
  TuiPageBlock,
  TuiPageData,
  TuiPageDataStore,
  TuiPageMetadata,
  TuiPageStrings,
  TuiPageTag,
} from './types';

export {
  createPage,
  translateBlockStrings,
  translateMetadata,
  useTuiPage,
  TuiPageKey,
} from './src/tuipage';

export default function install(app: App) {
  app.component('TuiPage', TuiPage);
}

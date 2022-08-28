import { createApp, defineAsyncComponent, type AsyncComponentLoader } from 'vue';
import App from './App.vue';

import './assets/main.css';

const app = createApp(App);

const pageComponents = import.meta.glob('./components/global/*.vue');
for (const path in pageComponents) {
  const componentFilename = path.split('/').pop() as string;
  const componentName = componentFilename.split('.')[0];

  app.component(componentName, defineAsyncComponent(pageComponents[path] as AsyncComponentLoader));
}

app.mount('#app');

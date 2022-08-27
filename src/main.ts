import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';

import './assets/main.css';

const pageComponents = import.meta.glob('./components/global/*.vue');
const app = createApp(App);

for (const path in pageComponents) {
  const componentName = path.split('/').pop().split('.')[0];

  app.component(componentName, defineAsyncComponent(pageComponents[path]));
}

app.mount('#app');

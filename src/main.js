import { createApp } from 'vue'
import App from './App.vue';

const app = createApp(App)

const pageComponents = import.meta.glob('./components/global/*.vue');
for (const path in pageComponents) {
  const componentName = path
    .split('/')
    .pop()
    .split('.')[0];

    app.component(componentName, pageComponents[path])
  }

  app.mount('#app');

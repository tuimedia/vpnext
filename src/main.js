import Vue from 'vue';
import App from './App.vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

const pageComponents = import.meta.glob('./components/global/*.vue');
for (const path in pageComponents) {
  const componentName = path
    .split('/')
    .pop()
    .split('.')[0];

  Vue.component(componentName, pageComponents[path]);
}

new Vue({
  render: (h) => h(App),
}).$mount('#app');

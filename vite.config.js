const { createVuePlugin } = require('vite-plugin-vue2');

module.exports = {
  plugins: [createVuePlugin()],
  base: '/vpnext/',
  build: {
    outDir: 'docs',
  },
};

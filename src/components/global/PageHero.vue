<template>
  <div>
    <h1>{{ data.title }}</h1>
    <div v-html="metadata"></div>
  </div>
</template>

<script>
import { defineComponent, inject } from '@vue/composition-api'

export default defineComponent({
  props: {
    data: { type: Object, required: true }
  },
  setup() {
    const page = inject('page');
    const metadata = page.metadata.value;

    return {
      metadata,
    };
  },
})
</script>

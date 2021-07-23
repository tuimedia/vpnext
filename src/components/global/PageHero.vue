<template>
  <div>
    <h1>{{ data.title }}</h1>
    <div>{{ metadata }}</div>
  </div>
</template>

<script>
import { computed, defineComponent, inject } from 'vue'

export default defineComponent({
  props: {
    data: { type: Object, required: true }
  },
  setup() {
    const page = inject('TuiPage');
    const metadata = computed(() => JSON.stringify(page.metadata));

    return {
      metadata,
    };
  },
})
</script>

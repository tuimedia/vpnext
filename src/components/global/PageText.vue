<template>
  <div>
    <component v-if="data.title.length" :is="data.titleLevel === 'tertiary' ? 'h3' : 'h2'" v-text="data.title" />
    <div v-html="data.copy">{{ data }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: { type: Object, required: true }
  },
})
</script>

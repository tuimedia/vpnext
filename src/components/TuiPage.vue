<template>
  <article>
    <component
      v-for="block in rows"
      :key="block.id"
      :is="block.component"
      :data="block"
    />
  </article>
</template>

<script>
import { defineComponent, provide, readonly } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    provide('page', readonly(props.data));

    return {
      rows: props.data.rows,
    };
  },
});
</script>

<template>
  <div>
    <component
      v-for="block in blocks"
      :key="block.id"
      :is="block.component"
      :data="block"
    />
  </div>
</template>

<script>
import { defineComponent, computed, inject } from '@vue/composition-api'

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const page = inject('page');
    const blocks = computed(() => {
      return props.data.blocks.map(id => page.blocks.value[id]);
    });

    return { blocks };
  },
})
</script>

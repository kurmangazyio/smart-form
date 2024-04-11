<template>
  <div
    class="separator separator-dashed my-3"
    :class="field.class"
    :style="field.style"
  />
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { FormSeparatorField } from '@shared-types/form'

defineProps({
  field: {
    type: Object as PropType<FormSeparatorField>,
    required: true
  }
})
</script>

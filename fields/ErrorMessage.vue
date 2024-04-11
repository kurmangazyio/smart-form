<template>
  <div
    class="fv-plugins-message-container"
  >
    <div class="fv-help-block">
      {{ input.errorMessage }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { FormInput } from '@shared/types'

defineProps({
  input: {
    type: Object as PropType<FormInput>,
    default: null
  }
})
</script>

<template>
  <div
    class="form-group"
    :class="field?.group?.class"
    :style="field?.group?.style"
  >
    <label
      v-if="field.label && field.label.text"
      :class="field.label.class"
      :style="field.label.style"
    >
      <template v-if="field.label && field.label.slot">
        <slot :name="field.label.slot" />
      </template>
      <template v-else>
        {{ field.label.text }}
      </template>
    </label>
    <div class="custom-editor-wrapper">
      <editor
        v-model="editorModel"
        :api-key="key"
        :init="options"
        :disabled="field.disabled"
      />
    </div>
    <small
      v-if="field.hint"
      class="form-text text-muted"
    >
      <template v-if="field.hintSlot">
        <slot :name="field.hintSlot" />
      </template>
      <template v-else>
        <i
          v-if="field.hintIcon"
          class="bi bi-info-circle fs-8"
        />
        {{ field.hint }}
      </template>
    </small>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref, watch } from 'vue'
import { FormEditorField, FormInput } from '@shared-types/form'
import { tinyMceOptions } from '@shared-utils/editor'

import Editor from '@tinymce/tinymce-vue'

const props = defineProps({
  input: {
    type: Object as PropType<FormInput>,
    required: true
  },
  inputIdx: {
    type: Number,
    required: true
  },
  fieldName: {
    type: [Number, String],
    required: true
  },
  field: {
    type: Object as PropType<FormEditorField>,
    required: true
  }
})

const emit = defineEmits(['setValue'])
const editorModel = ref(props.input.value)
const key = process.env.APP_TINYMCE_KEY || ''

const options = tinyMceOptions(
  props.field.plugins || [],
  props.field.toolbar || 'bold italic | alignleft aligncenter alignright | bullist numlist | removeformat'
)

watch(
  () => editorModel.value,
  (newValue: string) => {
    emit('setValue', {
      idx: props.inputIdx,
      name: props.field.name,
      oldValue: props.input.value,
      newValue: newValue
    })
  }
)

watch(
  () => props.input.value,
  (newValue) => { editorModel.value = newValue || '' }
)
</script>
<style lang="scss" scoped>

.custom-editor-wrapper {
  border: 0.2px solid rgb(234, 227, 227);
  border-radius: 0.475rem;
}

html[data-theme="dark"] {
  .custom-editor-wrapper {
    border: 0.2px solid #222f3e !important;
  }
}
</style>

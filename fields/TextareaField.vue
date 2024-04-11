<template>
  <div
    class="form-group"
    :class="field?.group?.class"
    :style="field?.group?.style"
  >
    <label
      v-if="field.label && field.label.text"
      :for="`inputText${fieldName}`"
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
    <textarea
      :id="`textArea${fieldName}`"
      class="form-control"
      :class="field.class"
      :style="field.style"
      :rows="field.rows"
      :cols="field.cols"
      :required="field.required"
      :disabled="field.disabled"
      :aria-describedby="`textareaTextHelp${fieldName}`"
      :value="input.value"
      :placeholder="field.placeholder"
      @input="updateValue"
    />
    <small
      v-if="field.hint"
      :id="`textareaTextHelp${fieldName}`"
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
import { PropType } from 'vue'
import { FormInput, FormTextAreaField } from '@shared-types/form'

const props = defineProps({
  input: {
    type: Object as PropType<FormInput>,
    required: true
  },
  inputIdx: {
    type: Number,
    required: true
  },
  field: {
    type: Object as PropType<FormTextAreaField>,
    required: true
  },
  fieldType: {
    type: String,
    default: 'textarea'
  },
  fieldName: {
    type: [Number, String],
    required: true
  }
})

const emit = defineEmits(['setValue'])

const updateValue = (event) => {
  emit('setValue', {
    idx: props.inputIdx,
    name: props.field.name,
    oldValue: props.input.value,
    newValue: event.target.value
  })
}
</script>

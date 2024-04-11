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
        {{ isTranslatable(field.hint) ? $t(field.label.text) : field.label.text }}
      </template>
    </label>
    <input
      :id="`inputText${fieldName}`"
      :type="field.type || 'text'"
      :name="fieldName"
      class="form-control"
      :class="field.class"
      :style="field.style"
      :placeholder="field.placeholder"
      :value="input.value"
      :required="field.required"
      :disabled="field.disabled"
      v-bind="field.binding || {}"
      @input="updateValue"
    >
    <small
      v-if="field.hint"
      :id="`inputTextHelp${fieldName}`"
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
        {{ isTranslatable(field.hint) ? $t(field.hint) : field.hint }}
      </template>
    </small>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { FormField, FormInput } from '@shared-types/form'
import { isTranslatable } from '@shared/utils'

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
    type: [String],
    required: true
  },
  field: {
    type: Object as PropType<FormField>,
    required: true
  }
})

const emit = defineEmits(['setValue'])

const updateValue = (event) => {
  emit('setValue', {
    idx: props.inputIdx,
    name: props.field.name,
    oldValue: props.input.value || null,
    newValue: event.target.value
  })
}
</script>

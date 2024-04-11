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
    <pms-auto-complete
      v-model="inputModel"
      :name="field.name"
      :class="field.class"
      :suggestions="comSuggestions || []"
      :suggestion-class="field.suggestions?.class || 'mh-200px'"
      :show-burger="field.burger || true"
      :input-class="field.input?.class || 'form-control form-control-lg'"
      :suggestion-item-class="field.suggestions.itemClass || ''"
      :placeholder="field.placeholder"
      :disabled="field.disabled"
    />
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
        {{ field.hint }}
      </template>
    </small>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { computed, PropType, ref, watch } from 'vue'
import { FormAutocompleteField, FormInput } from '@shared-types/form'

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
    type: Object as PropType<FormAutocompleteField>,
    required: true
  },
  modelValue: {
    type: [String, Number] as PropType<unknown>,
    default: ''
  }
})

const emit = defineEmits(['setValue'])
const inputModel = ref<string>(props.field.value as string || '')

const comSuggestions = computed(() => {
  const suggestions: Array<string> = []
  const suggestionItems = props.field.suggestions?.items || []

  suggestionItems.forEach((item) => {
    if (item[props.field.suggestions.itemField]) {
      suggestions.push(item[props.field.suggestions.itemField])
    }
  })
  return suggestions
})

watch(
  () => inputModel.value,
  (newValue) => {
    emit('setValue', {
      idx: props.inputIdx,
      name: props.field.name,
      oldValue: props.input.value,
      newValue: newValue
    })
  },
  { immediate: true }
)
</script>

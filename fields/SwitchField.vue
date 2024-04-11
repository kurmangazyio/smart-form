<template>
  <div
    class="form-group"
    :class="field?.group?.class"
    :style="field?.group?.style"
  >
    <label
      class="form-check form-switch form-check-custom form-check-solid"
      :class="{ [field.cover?.class || '']: true }"
      :style="field.cover?.style"
    >
      <input
        class="form-check-input cursor-pointer"
        type="checkbox"
        :class="{ [field.class || '']: true }"
        :style="field.style"
        :value="input.value"
        :disabled="field.disabled"
        :required="field.required"
        :checked="input.value == true"
        @change="updateValue"
      >
      <span
        v-if="field.label && field.label.text"
        class="form-check-label"
        :class="field.label.class"
        :style="field.label.style"
      >
        <template v-if="field.label && field.label.slot">
          <slot :name="field.label.slot" />
        </template>
        <template v-else>
          {{ field.label.text }}
        </template>
      </span>
    </label>
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
import { PropType, onMounted } from 'vue'
import { FormInput, FormSwitchField } from '@shared-types/form'

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
    type: Object as PropType<FormSwitchField>,
    required: true
  }
})

const emit = defineEmits(['setValue'])

const updateValue = (event) => {
  emit('setValue', {
    idx: props.inputIdx,
    name: props.field.name,
    oldValue: props.input.value,
    newValue: event.target.checked
  })
}

onMounted(() => {
  if (props.input.value === undefined) {
    emit('setValue', {
      idx: props.inputIdx,
      name: props.field.name,
      oldValue: props.input.value,
      newValue: false
    })
  }
})
</script>

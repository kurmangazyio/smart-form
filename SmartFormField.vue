<template>
  <template
    v-for="(field, index) in fields"
    :key="index"
  >
    <input-field
      v-if="['text','number','email','url','time','tel','password','month','date','color'].includes(field.type)"
      :input="inputs[field.name]"
      :input-idx="idx"
      :field="field"
      :field-name="field.name"
      @setValue="setValue"
    >
      <error-message
        v-if="inputs[field.name].errorMessage && options?.validator?.showErrorMessages"
        :input="inputs[field.name]"
      />
    </input-field>
    <select-field
      v-if="field.type === 'select'"
      :field="field"
      :field-name="field.name"
      :input="inputs[field.name]"
      :input-idx="idx"
      @setValue="setValue"
    >
      <error-message
        v-if="inputs[field.name].errorMessage && options?.validator?.showErrorMessages"
        :input="inputs[field.name]"
      />
    </select-field>
    <radio-field
      v-if="field.type === 'radio'"
      :field="field"
      :field-name="field.name"
      :input="inputs[field.name]"
      :input-idx="idx"
      @setValue="setValue"
    >
      <error-message
        v-if="inputs[field.name].errorMessage && options?.validator?.showErrorMessages"
        :input="inputs[field.name]"
      />
    </radio-field>
    <checkbox-field
      v-if="field.type === 'checkbox'"
      :field="field"
      :field-name="field.name"
      :input="inputs[field.name]"
      :input-idx="idx"
      @setValue="setValue"
    >
      <error-message
        v-if="inputs[field.name].errorMessage && options?.validator?.showErrorMessages"
        :input="inputs[field.name]"
      />
    </checkbox-field>
    <separator-field
      v-if="field.type === 'separator'"
      :field="field"
    />
    <textarea-field
      v-if="field.type === 'textarea'"
      :field="field"
      :field-name="field.name"
      :input="inputs[field.name]"
      :input-idx="idx"
      @setValue="setValue"
    >
      <error-message
        v-if="inputs[field.name].errorMessage && options?.validator?.showErrorMessages"
        :input="inputs[field.name]"
      />
    </textarea-field>
    <editor-field
      v-if="field.type === 'editor'"
      :field="field"
      :field-name="field.name"
      :input="inputs[field.name]"
      :input-idx="idx"
      @setValue="setValue"
    >
      <error-message
        v-if="inputs[field.name].errorMessage && options?.validator?.showErrorMessages"
        :input="inputs[field.name]"
      />
    </editor-field>
    <auto-complete-field
      v-if="field.type === 'autocomplete'"
      v-model="inputs[field.name].value"
      :field="field"
      :field-name="field.name"
      :input="inputs[field.name]"
      :input-idx="idx"
      @setValue="setValue"
    >
      <error-message
        v-if="inputs[field.name].errorMessage && options?.validator?.showErrorMessages"
        :input="inputs[field.name]"
      />
    </auto-complete-field>
    <switch-field
      v-if="field.type === 'switch'"
      :field="field"
      :field-name="field.name"
      :input="inputs[field.name]"
      :input-idx="idx"
      @setValue="setValue"
    >
      <error-message
        v-if="inputs[field.name].errorMessage && options?.validator?.showErrorMessages"
        :input="inputs[field.name]"
      />
    </switch-field>
    <template
      v-if="field.type === 'slot'"
    >
      <div
        class="form-group"
        :class="field?.group?.class"
        :style="field?.group?.style"
      >
        <slot
          :name="field.name"
          v-bind="{
            value: inputs[field.name],
            values: inputs,
            inputs: allInputs,
            setValue: (value) => {
              setValue({
                idx: idx,
                name: field.name,
                oldValue: inputs[field.name].value,
                newValue: value
              })
            }
          }"
        />
      </div>
    </template>
  </template>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { FormOptions, FormInput, FormField } from '@shared-types/form'

import ErrorMessage from './fields/ErrorMessage.vue'
import InputField from './fields/InputField.vue'
import SelectField from './fields/SelectField.vue'
import RadioField from './fields/RadioField.vue'
import CheckboxField from './fields/CheckboxField.vue'
import SeparatorField from './fields/SeparatorField.vue'
import TextareaField from './fields/TextareaField.vue'
import EditorField from './fields/EditorField.vue'
import AutoCompleteField from './fields/AutoCompleteField.vue'
import SwitchField from './fields/SwitchField.vue'

defineProps({
  idx: {
    type: Number,
    required: true
  },
  fields: {
    type: Array as PropType<Array<FormField>>,
    default: () => []
  },
  options: {
    type: Object as PropType<FormOptions>,
    required: true
  },
  inputs: {
    type: Object as PropType<Record<string, FormInput>>,
    required: true
  },
  allInputs: {
    type: Array as PropType<Array<Record<string, FormInput>>>,
    required: true
  }
})

const emit = defineEmits([
  'setInput'
])

const setValue = (value) => {
  emit('setInput', value)
}
</script>

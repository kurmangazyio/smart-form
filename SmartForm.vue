<template>
  <form
    :class="{ [options.container?.class || '']: true }"
    :style="{ ...handleStyle(options.container?.style || '') }"
    @submit.prevent="onSubmit()"
  >
    <template
      v-for="(item, index) in fields"
      :key="index"
    >
      <template v-if="Array.isArray(item)">
        <template v-if="hasLabels">
          <div
            class="row"
            :class="{ [options.labelContainer?.class || '']: true }"
            :style="{ ...handleStyle(options.labelContainer?.style || '') }"
          >
            <div
              class="col-12"
              :class="{ [options.labelContainer?.left?.class || 'col-md-4']: true }"
              :style="{ ...handleStyle(options.labelContainer?.left?.style || 'vertical-align: middle;') }"
            />
            <div
              class="col-12"
              :class="{ [options.labelContainer?.right?.class || 'col-md-8']: true }"
              :style="{ ...handleStyle(options.labelContainer?.right?.style || '') }"
            >
              <smart-form-field
                :idx="index"
                :fields="item"
                :options="options"
                :inputs="inputs[index]"
                :all-inputs="inputs"
                @setInput="setInput"
              >
                <template
                  v-for="(_, slot) of $slots"
                  #[slot]="scope"
                >
                  <slot
                    :name="slot"
                    v-bind="scope"
                  />
                </template>
              </smart-form-field>
            </div>
          </div>
        </template>
        <template v-else>
          <smart-form-field
            :idx="index"
            :fields="item"
            :options="options"
            :inputs="inputs[index]"
            :all-inputs="inputs"
            @setInput="setInput"
          >
            <template
              v-for="(_, slot) of $slots"
              #[slot]="scope"
            >
              <slot
                :name="slot"
                v-bind="scope"
              />
            </template>
          </smart-form-field>
        </template>
      </template>
      <template v-else>
        <template v-if="hasLabels">
          <div
            class="row"
            :class="{ [options.labelContainer?.class || '']: true }"
            :style="{ ...handleStyle(options.labelContainer?.style || '') }"
          >
            <div
              class="col-12"
              :class="{ [options.labelContainer?.left?.class || 'col-md-4']: true }"
              :style="{ ...handleStyle(options.labelContainer?.left?.style || '') }"
            >
              <template v-if="item.label">
                <template v-if="item.label.slot">
                  <slot :name="item.label.slot" />
                  <p
                    v-if="item.label.subText"
                    :class="item.label.subText.class || 'p-0 m-0 text-muted'"
                    :style="item.label.subText.style"
                  >
                    {{ item.label.subText && isTranslatable(item.label.subText.text) ? $t(item.label.subText.text) : item.label.subText.text }}
                  </p>
                </template>
                <template v-else>
                  <div
                    :class="{ [item.label.class || '']: true }"
                    :style="{ ...handleStyle(item.label.style || 'vertical-align: middle;') }"
                  >
                    <span style="vertical-align: middle;">
                      {{ item.label.text && isTranslatable(item.label.text) ? $t(item.label.text) : item.label.text }}
                    </span>
                    <p
                      v-if="item.label.subText"
                      :class="item.label.subText.class || 'p-0 m-0 text-muted'"
                      :style="item.label.subText.style"
                    >
                      {{ item.label.subText && isTranslatable(item.label.subText.text) ? $t(item.label.subText.text) : item.label.subText.text }}
                    </p>
                  </div>
                </template>
              </template>
            </div>
            <div
              class="col-12"
              :class="{ [options.labelContainer?.right?.class || 'col-md-8']: true }"
              :style="{ ...handleStyle(options.labelContainer?.right?.style || '') }"
            >
              <div
                :class="{
                  [options.group?.class || '']: true,
                  [item?.class || ''] : true
                }"
                :style="{
                  ...handleStyle(options.group?.style || ''),
                  ...handleStyle(item.style || '')
                }"
              >
                <smart-form-field
                  :idx="index"
                  :fields="item.fields"
                  :options="options"
                  :inputs="inputs[index]"
                  :all-inputs="inputs"
                  @setInput="setInput"
                >
                  <template
                    v-for="(_, slot) of $slots"
                    #[slot]="scope"
                  >
                    <slot
                      :name="slot"
                      v-bind="scope"
                    />
                  </template>
                </smart-form-field>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            :class="{
              [options.group?.class || '']: true,
              [item?.class || ''] : true
            }"
            :style="{
              ...handleStyle(options.group?.style || ''),
              ...handleStyle(item.style || '')
            }"
          >
            <smart-form-field
              :idx="index"
              :fields="item.fields"
              :options="options"
              :inputs="inputs[index]"
              :all-inputs="inputs"
              @setInput="setInput"
            >
              <template
                v-for="(_, slot) of $slots"
                #[slot]="scope"
              >
                <slot
                  :name="slot"
                  v-bind="scope"
                />
              </template>
            </smart-form-field>
          </div>
        </template>
      </template>
    </template>
    <slot
      v-if="('formControls' in $slots) && options?.controls?.position === 'bottom'"
      name="formControls"
    />
    <div
      v-else
      :class="{ [options.controls?.class || 'mt-6']: true }"
      :style="{ ...handleStyle(options.controls?.style || '') }"
    >
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="loader"
      >
        <span
          v-if="!loader"
          class="indicator-label"
        >
          {{ $t('common.submit') }}
        </span>
        <span
          v-else
          class="indicator-label"
        >
          {{ $t('phrases.please-wait') }}
          <span class="spinner-border spinner-border-sm align-middle ms-2" />
        </span>
      </button>
      <button
        v-if="options?.controls?.showReset"
        type="reset"
        class="btn btn-light ms-3"
        :disabled="loader"
      >
        {{ $t('common.reset') }}
      </button>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { computed, PropType, ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { useAlert } from '@shared/composable'

import { FormGroup, FormField, FormOptions, FormCustomValidatorFunction, FormInput } from '@shared-types/form'
import { handleOptions, handleStyle, isTranslatable } from '@shared/utils'

import * as yup from 'yup'

import SmartFormField from './SmartFormField.vue'

const { error } = useAlert()

const defaultOptions: FormOptions = {
  container: { class: '', style: '' },
  group: { class: '', style: '' },

  controls: {
    position: 'bottom',
    class: 'text-start mt-6',
    style: '',

    showReset: true
  },

  labelContainer: {
    class: 'row',
    style: '',

    left: { class: '', style: '' },
    right: { class: '', style: '' }
  },

  validator: {
    validate: true,
    alert: true,
    errorMessage: 'phrases.form-error-invalid',
    showErrorMessages: true
  },

  submit: {
    valuesCombined: true
  }
}

const inputTypes = {
  text: '',
  number: null,
  email: '',
  url: '',
  time: null,
  tel: '',
  password: '',
  month: null,
  date: null,
  color: null,
  select: null,
  radio: null,
  checkbox: [],
  separator: null,
  textarea: '',
  editor: '',
  autocomplete: '',
  slot: null
}

const props = defineProps({
  loader: {
    type: Boolean,
    default: false
  },
  fields: {
    type: Array as PropType<Array<FormGroup | Array<FormField>>>,
    default: () => []
  },
  options: {
    type: Object as PropType<FormOptions>,
    default: () => ({ type: 'row' })
  },
  customValidator: {
    type: Function as PropType<FormCustomValidatorFunction>,
    default: undefined
  }
})

const emit = defineEmits([
  'update:loader',
  'update:fields',
  'update:modelValue',
  'handleSubmit',
  'handleChange'
])

const handleInputs = (fieldItems: Array<FormGroup | Array<FormField>>): Array<Record<string, FormInput>> => {
  const handlingInputs: Array<Record<string, FormInput>> = []

  for (const fields of fieldItems) {
    const currentFields = {}
    const iterFields = Array.isArray(fields) ? fields : fields.fields

    for (const iterField of iterFields) {
      if (!iterField.name && iterField.type !== 'separator') {
        throw new Error('Field name is required')
      }

      if (iterField.type === 'separator') {
        continue
      }

      if (iterField.type === 'slot') {
        currentFields[iterField.name] = { value: null } as FormInput
        continue
      }

      if (iterField.validator) {
        if (iterField.validator.schema === 'plain' || iterField.validator.schema === 'global') {
          const { value, errors, errorMessage } = useField(iterField.name, iterField.validator.rules)

          if (iterField.value) value.value = iterField.value
          currentFields[iterField.name] = { value, errors, errorMessage } as FormInput
        } else if (iterField.validator.schema === 'yup') {
          let yupChain = yup

          for (const rule of iterField.validator.rules) {
            if (typeof rule === 'string') {
              yupChain = yupChain[rule]()
            } else {
              if (rule.value) {
                yupChain = yupChain[rule.func](rule.value)
              }

              if (rule.args && rule.args.length > 0) {
                yupChain = yupChain[rule.func](...rule.args)
              }
            }
          }

          const { value, errors, errorMessage } = useField(iterField.name, yupChain)
          if (iterField.value) value.value = iterField.value
          currentFields[iterField.name] = { value, errors, errorMessage } as FormInput
        }
      } else {
        let value: string | number | boolean | null | undefined | Array<unknown> = inputTypes[iterField.type || 'text']

        if ('value' in iterField) {
          if (iterField.type === 'checkbox') {
            value = iterField.value ? [iterField.value] : []
          } else {
            value = iterField.value as string | number | boolean | null | undefined
          }
        }
        currentFields[iterField.name] = { value } as FormInput
      }
    }

    handlingInputs.push(currentFields)
  }

  return handlingInputs
}

const prepareInputsToSubmit = (inputs: Array<Record<string, FormInput>>): { values: Array<Record<string, unknown>>, errors: Array<string> } => {
  const values: Array<Record<string, unknown>> = []
  const errors: Array<string> = []

  inputs.forEach((input) => {
    const valueRecord = {}

    for (const [key, value] of Object.entries(input)) {
      const properties = value as { value: unknown, errors?: Array<string>, errorMessage?: string }
      valueRecord[key] = properties.value
      if (properties.errors && properties.errors.length > 0) {
        errors.push(...properties.errors)
      }
    }

    values.push(valueRecord)
  })

  return {
    values,
    errors
  }
}

const handleValidate = (inputs: Array<Record<string, FormInput>>): boolean => {
  return inputs.reduce((acc, input) => {
    for (const [, value] of Object.entries(input)) {
      const properties = value as { value: unknown, errors?: Array<string>, errorMessage?: string }
      if (properties.errors && properties.errorMessage) acc++
    }

    return acc
  }, 0) === 0
}

const options = computed(() => handleOptions(props.options, defaultOptions))
const inputs = ref<Array<Record<string, FormInput>>>(handleInputs(props.fields))
const hasLabels = computed(() => props.fields.reduce((acc: number, item: FormGroup | Array<FormField>) => !Array.isArray(item) ? acc + (item.label ? 1 : 0) : acc, 0) > 0)

const setInput = (input: { idx: number, name: string, oldValue: unknown, newValue: unknown }) => {
  inputs.value[input.idx][input.name].value = input.newValue
  emit('handleChange', {
    name: input.name,
    oldValue: input.oldValue,
    newValue: input.newValue
  })
}

const onSubmit = () => {
  const { values, errors } = prepareInputsToSubmit(inputs.value)
  const isValid = props.customValidator ? props.customValidator(values) : handleValidate(inputs.value)

  if (!props.customValidator && !isValid) {
    if (options.value.validator?.alert) {
      error({
        text: errors.length > 0 ? errors[0] : options.value.validator?.errorMessage as string
      })
    }

    if (options.value.validator?.validate) return
  }

  let combinedValues: Record<string, unknown> | Array<Record<string, unknown>> = values

  if (options.value.submit && options.value.submit.valuesCombined) {
    combinedValues = values.reduce((acc, items) => ({ ...acc, ...items }), {})
  }

  emit('handleSubmit', { valid: isValid, values: combinedValues, errors })
}

watch(
  () => props.loader,
  (newValue: boolean) => {
    emit('update:loader', newValue)
  }
)

watch(
  () => props.fields,
  (newValue: Array<FormGroup | Array<FormField>>) => {
    emit('update:fields', newValue)
    inputs.value = handleInputs(newValue)
  },
  { deep: true }
)
</script>

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
        {{ isTranslatable(field.label.text) ? $t(field.label.text) : field.label.text }}
      </template>
    </label>
    <select
      :id="`inputSelect${fieldName}`"
      class="form-select"
      :class="field.class"
      :style="field.style"
      :aria-describedby="`selectHelp${fieldName}`"
      :placeholder="field.placeholder"
      :required="field.required"
      :disabled="field.disabled"
      @change="updateValue"
    >
      <option
        v-if="!('nullable' in field) || field.nullable === true"
        value="null"
        :selected="input.value === null"
      >
        {{ $t('common.not-selected') }}
      </option>
      <template v-if="'options' in field">
        <template
          v-for="(option, index) in field.options"
          :key="index"
        >
          <template
            v-if="'group' in option"
          >
            <optgroup :label="option.label">
              <template
                v-for="(groupItem, groupIndex) in option.group"
                :key="groupIndex"
              >
                <option
                  v-if="!groupItem.group"
                  :value="groupItem.value"
                  :selected="groupItem.value === input.value"
                  v-html="groupItem.label"
                />
                <template v-else>
                  <option
                    disabled
                    style="font-weight: bold;"
                    v-html="groupItem.label"
                  />
                  <template
                    v-for="(group2Item,group2Index) in groupItem.group"
                    :key="group2Index"
                  >
                    <option
                      :value="group2Item.value"
                      :selected="group2Item.value===input.value"
                      v-html="group2Item.label"
                    />
                  </template>
                </template>
              </template>
            </optgroup>
          </template>
          <template v-else>
            <option
              :value="option.value"
              :selected="option.value === input.value"
              v-html="option.label"
            />
          </template>
        </template>
      </template>
      <template v-if="'complexOption' in field">
        <template
          v-for="(option, index) in convertedOptions"
          :key="index"
        >
          <option
            :value="option.value"
            :selected="deepEqualObject(input.value, JSON.parse(option.value))"
            v-html="option.label"
          />
        </template>
      </template>
    </select>
    <small
      v-if="field.hint"
      :id="`selectHelp${fieldName}`"
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
<script lang="ts" setup>
import { PropType, onMounted, computed } from 'vue'
import { FormInput, FormSelectField } from '@shared-types/form'
import { isTranslatable, deepEqualObject } from '@shared/utils'

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
    type: Object as PropType<FormSelectField>,
    required: true
  },
  fieldName: {
    type: [Number, String],
    required: true
  }
})

const emit = defineEmits(['setValue'])
const convertedOptions = computed(() => props.field?.complexOption?.map((option) => {
  return {
    label: option.label,
    value: JSON.stringify(option.value)
  }
}))

const updateValue = (event) => {
  if (typeof JSON.parse(event.target.value) === 'object') {
    emit('setValue', {
      idx: props.inputIdx,
      name: props.field.name,
      oldValue: props.input.value || null,
      newValue: event.target.value === 'null' ? null : JSON.parse(event.target.value)
    })
  } else {
    emit('setValue', {
      idx: props.inputIdx,
      name: props.field.name,
      oldValue: props.input.value || null,
      newValue: event.target.value === 'null' ? null : event.target.value
    })
  }
}

onMounted(() => {
  if ('nullable' in props.field && props.field.nullable === false && props.input.value === null) {
    emit('setValue', {
      idx: props.inputIdx,
      name: props.field.name,
      oldValue: props.input.value || null,
      newValue: props.field.options[0].value
    })
  }
})
</script>

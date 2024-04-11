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
    <div
      :class="{ 'd-flex flex-row' : field.inline && !doWeHaveImage }"
    >
      <template v-if="doWeHaveImage">
        <template
          v-for="(item, index) in field.options"
          :key="index"
        >
          <label
            class="form-check-image"
            :class="{ 'active': input.value === item.value }"
            :for="item.id"
          >
            <div class="form-check-wrapper">
              <img
                :src="item.image?.src || '/no-image.png'"
                :alt="item.image?.alt"
                :class="item.image?.class || 'w-150px'"
                :style="item.image?.style"
              >
            </div>

            <div class="form-check form-check-custom form-check-solid">
              <input
                :id="item.id"
                class="form-check-input cursor-pointer"
                type="radio"
                :class="{ [item.class || 'h-20px w-20px']: true }"
                :style="item.style"
                :name="item.id"
                :value="item.value"
                :checked="input.value === item.value"
                :disabled="item.disabled"
                @change="updateValue"
              >
              <div
                v-if="item.label"
                class="form-check-label cursor-pointer"
                :class="item?.label?.class"
                :style="item?.label?.style"
              >
                <template v-if="item.label?.html">
                  <div v-html="item.label?.text" />
                </template>
                <template v-else>
                  {{ item.label?.text }}
                </template>
              </div>
            </div>
          </label>
        </template>
      </template>
      <template v-else>
        <template
          v-for="(item, index) in field.options || []"
          :key="index"
        >
          <div
            class="form-check form-check-custom form-check-solid"
            :class="{
              'pb-2': !field.inline || (field.inline && !field.inline),
              'pe-6': field.inline
            }"
          >
            <input
              :id="item.id"
              class="form-check-input cursor-pointer"
              type="radio"
              :class="{ [item.class || 'h-20px w-20px']: true }"
              :style="item.style"
              :name="item.id"
              :value="item.value"
              :checked="input.value == item.value"
              :disabled="item.disabled"
              @change="updateValue"
            >
            <label
              v-if="item.label"
              class="form-check-label cursor-pointer"
              :for="item.id"
              :class="item.label?.class"
              :style="item.label?.style"
            >
              <template v-if="item.label?.html">
                <div v-html="item.label?.text" />
              </template>
              <template v-else>
                {{ item.label?.text }}
              </template>
            </label>
          </div>
        </template>
      </template>
    </div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { FormInput, FormRadioField } from '@shared-types/form'

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
    type: Object as PropType<FormRadioField>,
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

const doWeHaveImage = computed(() => {
  if (!props.field.options) {
    return false
  }

  return props.field.options.reduce((acc, item) => acc + (item.image ? 1 : 0), 0) > 0
})
</script>

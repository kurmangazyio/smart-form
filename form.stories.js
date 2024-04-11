import { ref } from 'vue'
import { createUi } from '@shared-utils/storybook'

import SmartForm from '../shared/form/SmartForm.vue'

const template = `
  <pms-card :header="false">
    <pms-smart-form @handleSubmit="handleSubmit" @handleChange="onChangeInput" v-bind="args">
      <template #labelSlot>
        <div class="mt-3 fs-5 fw-bolder">
          dsvlsndvlskndvlk sdnvklslvknlknvsdv
        </div>
      </template>
    </pms-smart-form>
    {{ validRef }} {{ valuesRef }} {{ errorsRef }}
  </pms-card>
`

const Template = createUi({
  template,
  components: {
    PmsSmartForm: SmartForm
  },
  setup () {
    const validRef = ref()
    const valuesRef = ref()
    const errorsRef = ref()

    const handleSubmit = ({ valid, values, errors }) => {
      validRef.value = valid
      valuesRef.value = values
      errorsRef.value = errors
    }

    const onChangeInput = ({ name, newValue, oldValue }) => {
      console.log(name, newValue, oldValue)
    }

    return {
      validRef,
      valuesRef,
      errorsRef,
      handleSubmit,
      onChangeInput
    }
  }
})

export const Default = Template.bind({})

Default.args = {
  options: {
    labelContainer: {
      left: {
        class: 'col-md-2 col-sm-6'
      },
      right: {
        class: 'col-md-10'
      }
    },

    validator: {
      validate: true,
      alert: false,
      errorMessage: 'phrases.form-error-invalid',
      showErrorMessages: true
    }
  },
  fields: [
    {
      class: 'd-flex flex-row',
      label: {
        slot: 'labelSlot'
      },
      fields: [
        {
          type: 'select',
          name: 'codePrefix',
          group: {
            class: 'me-2 mb-4'
          },
          nullable: true,
          options: [
            { value: '1', label: '1' },
            { value: '2', label: '2' }
          ]
        },
        {
          type: 'text',
          name: 'codeName',
          group: {
            class: 'me-2 mb-4'
          },
          validator: {
            schema: 'yup',
            rules: [
              'string',
              'required',
              { func: 'min', value: 5 },
              { func: 'max', value: 10 }
            ]
          }
        }
      ]
    },
    {
      class: 'd-flex flex-row',
      label: {
        text: 'acascascascac'
      },
      fields: [
        {
          class: 'w-100px',
          group: {
            class: 'me-1'
          },
          type: 'number',
          name: 'theory',
          hint: 'ascascacsaca',
          hintIcon: true
        },
        {
          class: 'w-100px',
          group: {
            class: 'me-1'
          },
          type: 'number',
          name: 'practice',
          hint: 'ascascacsaca',
          hintIcon: true
        },
        {
          class: 'w-100px',
          group: {
            class: 'me-1'
          },
          type: 'number',
          name: 'lab',
          hint: 'ascascacsaca',
          hintIcon: true
        }
      ]
    },
    [
      {
        group: {
          class: 'me-1 w-50'
        },
        type: 'number',
        value: 8,
        name: 'practice',
        hint: 'ascascacsaca',
        hintIcon: true,
        required: true,

        validator: {
          schema: 'yup',
          rules: [
            'number',
            'required',
            'positive'
          ]
        }
      },
      {
        group: {
          class: 'me-1 w-50'
        },
        type: 'select',
        name: 'selector',
        value: null,

        options: [
          { value: 1, label: '1' },
          { value: 2, label: '2' },
          { value: 3, label: '3' },
          { value: 4, label: '4' }
        ],

        validator: {
          schema: 'yup',
          rules: [
            'number',
            { func: 'notOneOf', value: [4] }
          ]
        }
      }
    ],

    // every fields
    [
      // radio
      {
        group: {
          class: 'mt-3'
        },
        type: 'radio',
        name: 'radio',
        inline: true,
        options: [
          {
            id: 1,
            value: 1,
            label: {
              text: 'this is 1'
            }
          },
          {
            id: 2,
            value: 2,
            label: {
              text: 'this is 2'
            }
          }
        ]
      },
      // checkbox
      {
        group: {
          class: 'mt-3'
        },
        type: 'checkbox',
        name: 'checkbox',
        inline: true,
        options: [
          {
            id: 1,
            value: 1,
            label: {
              text: 'this is 1'
            }
          },
          {
            id: 2,
            value: 2,
            label: {
              text: 'this is 2'
            }
          }
        ]
      },
      // textarea
      {
        group: {
          class: 'mt-3'
        },
        type: 'textarea',
        name: 'textarea',
        value: 'this is textarea'
      },
      // editor
      {
        group: {
          class: 'mt-3'
        },
        type: 'editor',
        name: 'editor',
        value: 'this is editor'
      },
      // 'autocomplete'
      {
        group: {
          class: 'mt-3'
        },
        type: 'autocomplete',
        name: 'autocomplete',
        value: 'this is autocomplete',
        suggestions: {
          itemField: 'name',
          items: [
            { id: 1, name: '1' },
            { id: 2, name: '2' },
            { id: 3, name: '3' },
            { id: 4, name: '4' }
          ]
        }
      },
      // switch
      {
        group: {
          class: 'mt-3'
        },
        type: 'switch',
        name: 'switch'
      }
    ]
  ]
}

export default {
  title: 'UI/Smart/Form',
  component: SmartForm,
  parameters: {
    design: '',
    status: {
      type: 'released',
      url: 'https://automation-team.jetbrains.space/p/pms/issue-boards'
    }
  },
  argTypes: {}
}

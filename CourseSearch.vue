<template>
  <pms-card
    :title="'common.search'"
    :description="$t('domains.academic.courses.search.description', { year })"
    :options="{ description: { class: 'mt-1 fs-7 text-muted' }, body: { class: 'pt-0'}}"
  >
    <pms-loader v-if="loader" />
    <pms-smart-form
      v-else
      :fields="[formFields]"
      @handleChange="onHandleChange"
      @handleSubmit="onSubmit"
    >
      <template #formControls>
        <div class="form-group mt-3">
          <pms-button
            type="submit"
            class="w-100 mt-2"
            :disabled="loader"
            :loader="searchLoader"
            :text="$t('common.search')"
          />
        </div>
      </template>
    </pms-smart-form>
  </pms-card>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { FormField } from '@shared/types'
import { useAlert, useLoader, usePagination, useToggler } from '@shared/composable'
import { useResource } from '@/shared/stores'

import { useCourses } from '../store'
import { yearTermsToYearsOptions, departmentsToDepartmentOptions } from '../utils'

const { t } = useI18n()
const { isActive } = useLoader()
const { error } = useAlert()
const { perPage } = usePagination()
const { toggle } = useToggler()

const store = useCourses()
const resource = useResource()

const loader = isActive('academic/resources')
const searchLoader = isActive('academic/courses')

const year = computed(() => store.getYear)

const tempValues = ref({
  year: null,
  department_code: null,
  code: null,
  name: null,
  equicode: null
})

const formFields = computed<Array<FormField>>(() => [
  {
    label: {
      text: `${t('common.select-year')}:`,
      class: 'mb-1'
    },
    name: 'year',
    type: 'select',
    value: tempValues.value.year || store.getYear,
    options: yearTermsToYearsOptions(resource.getResourceYearTerms)
  },
  {
    label: {
      text: `${t('common.select-department')}`,
      class: 'mb-1 mt-2 required'
    },
    name: 'department_code',
    type: 'select',
    value: tempValues.value.department_code || null,
    options: departmentsToDepartmentOptions(resource.getAcademicResourceDepartments)
  },
  {
    label: {
      text: `${t('common.enter-course-code')}:`,
      class: 'mb-1 mt-2'
    },
    name: 'code',
    type: 'text',
    value: tempValues.value.code || '',
    validator: {
      schema: 'yup',
      rules: [
        'string',
        { func: 'label', value: t('common.table.course-code') },
        'trim'
      ]
    }
  },
  {
    label: {
      text: `${t('common.common.table.course-title')}:`,
      class: 'mb-1 mt-2'
    },
    name: 'name',
    type: 'text',
    value: tempValues.value.name || '',
    validator: {
      schema: 'yup',
      rules: [
        'string',
        { func: 'label', value: t('common.table.course-title') },
        'trim'
      ]
    }
  },
  {
    label: {
      text: `${t('common.table.course-equicode')}:`,
      class: 'mb-1 mt-2'
    },
    name: 'equicode',
    type: 'number',
    value: Number(tempValues.value.equicode) || 0,
    validator: {
      schema: 'yup',
      rules: [
        'number',
        { func: 'label', value: t('common.table.course-equicode') },
        'positive'
      ]
    }
  }
])

const onHandleChange = ({ name, newValue }) => {
  tempValues.value[name] = newValue
}

const onSubmit = async ({ values }) => {
  if (values.department_code === null) {
    error({ text: t('domains.academic.courses.search.error.department') })
    return
  }

  tempValues.value = {
    ...tempValues.value,
    ...values
  }

  const { status, message } = await store.fetchCourses({ ...values, per_page: perPage.value, offset: 1 })
  if (status) toggle()
  if (!status) error({ text: message })
}
</script>

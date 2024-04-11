/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref } from 'vue'

// field validator types
type ValidatorPlain = {
  schema: 'plain',
  rules: 'string'
}

type ValidatorGlobal = {
  schema: 'global',
  rules: Record<string, unknown>
}

type ValidatorYup = {
  schema: 'yup';
  rules: Array<string | {
    func: string;
    value?: unknown,
    args?: Array<unknown>;
  }>;
}

// field types
export type FormFieldProps = {
  name: string;
  type: string;
  validator?: ValidatorPlain | ValidatorGlobal | ValidatorYup;
  value?: unknown;

  // styling
  group?: Partial<{
    class?: string;
    style?: string | Record<string, string>;
  }>
  class?: string;
  style?: string | Record<string, string>;

  // label
  label?: Partial<{
    text: string;
    slot?: string;

    class?: string;
    style?: string | Record<string, string>;
  }>;

  // hint
  hint?: string;
  hintIcon?: true | string;
  hintSlot?: string;

  placeholder?: string;
  required?: boolean;
  disabled?: boolean;

  binding?: Record<string, unknown>;
}

export type RadioOption = {
  id: string;
  value: unknown;

  disabled?: boolean;
  class?: string;
  style?: string | Record<string, string>;

  label: {
    text: string;
    html?: boolean;
    class?: string;
    style?: string | Record<string, string>;
  }

  image?: {
    src: string;
    alt?: string;
    class?: string;
    style?: string | Record<string, string>;
  }
}

export type InputField = {
  type: 'text' | 'number' | 'email' | 'url' | 'time' | 'tel' | 'password' | 'month' | 'date' | 'color';
}

export type CheckboxField = {
  type: 'checkbox';
  inline?: boolean;
  options: Array<RadioOption>;
}

export type SelectField = {
  type: 'select';
  nullable?: boolean;
  options: Array<{
    label: string;
    value: unknown;
    group?: Array<{
      value: unknown;
      label: string;
      group?: Array<{
        value: unknown,
        label: string
      }>
    }>;
  }>;
  complexOption?: Array<{
    label: string;
    value: unknown;
  }>
}

export type RadioField = {
  type: 'radio';
  inline?: boolean;
  options: Array<RadioOption>;
}

export type SlotField = {
  type: 'slot';
  name: string;

  group?: Partial<{
    class?: string;
    style?: string | Record<string, string>;
  }>
}

export type TextAreaField = {
  type: 'textarea';
  rows?: number;
  cols?: number;
}

export type EditorField = {
  type: 'editor';
  plugins?: Array<string>;
  toolbar?: string;
}

export type AutocompleteField = {
  type: 'autocomplete';
  suggestions: {
    itemField: string;
    itemClass?: string;
    items: Array<Record<string | number, any>>;
    class: string;
  };

  input?: Partial<{
    class: string;
  }>;

  burger?: boolean;
}

export type SwitchField = {
  type: 'switch';

  cover?: Partial<{
    class: string;
    style: string | Record<string, string>;
  }>;
}

export type SeparatorField = {
  type: 'separator';
  class?: string;
  style?: string | Record<string, string>;
}

// input types
export type DefaultInput = {
  value: any;
  errors?: Ref<Array<string>>;
  errorMessage?: Ref<string | undefined>;
};

export type ValidatorInput = {
  value: any;
  errors: Ref<Array<string>>;
  errorMessage: Ref<string | undefined>;
}

// form
export type FormOptions = Partial<{
  container: Partial<{
    class: string;
    style: string | Record<string, string>;
  }>

  group: Partial<{
    class: string;
    style: string | Record<string, string>;
  }>

  controls: Partial<{
    position: 'bottom' | 'top';
    class: string;
    style: string | Record<string, string>;

    showReset: boolean;
  }>

  labelContainer: Partial<{
    class: string;
    style: string | Record<string, string>;

    left: Partial<{
      class: string;
      style: string | Record<string, string>;
    }>

    right: Partial<{
      class: string;
      style: string | Record<string, string>;
    }>;
  }>;

  validator: Partial<{
    validate: boolean;
    alert: boolean;
    errorMessage: string;
    showErrorMessages: boolean;
  }>;

  submit?: Partial<{
    valuesCombined: boolean;
  }>;
}>

export type FormField = FormFieldProps & (InputField | SelectField | RadioField | CheckboxField | SeparatorField | SlotField | TextAreaField | EditorField | AutocompleteField | SwitchField)

export type FormInputField = FormFieldProps & InputField
export type FormSelectField = FormFieldProps & SelectField
export type FormRadioField = FormFieldProps & RadioField
export type FormCheckboxField = FormFieldProps & CheckboxField
export type FormSeparatorField = FormFieldProps & SeparatorField
export type FormSlotField = FormFieldProps & SlotField
export type FormTextAreaField = FormFieldProps & TextAreaField
export type FormEditorField = FormFieldProps & EditorField
export type FormAutocompleteField = FormFieldProps & AutocompleteField
export type FormSwitchField = FormFieldProps & SwitchField

export type FormGroup = {
  class?: string;
  style?: string | Record<string, string>;
  fields: Array<FormField>;

  label?: Partial<{
    text: string;
    slot: string;

    class: string;
    style: string | Record<string, string>;

    subText?: {
      text: string;
      class?: string;
      style?: string | Record<string, string>;
    }
  }>;
}

export type FormInput = DefaultInput | ValidatorInput

export type FormCustomValidatorFunction = (inputs: Array<Record<string, unknown>>) => boolean

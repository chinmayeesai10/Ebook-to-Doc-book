type ClassificationOption = {
  label: string;
  value: string;
};

export enum ClassificationFieldType {
  checklist = 'checklist',
  radio = 'radio',
  text = 'text',
  dropdown = 'dropdown'
}

export type OnAnswer = (answer: string[]) => void;

export interface ClassificationField {
  name: string;
  instructions: string;
  type: ClassificationFieldType;
  options?: ClassificationOption[];
  userAnswer?: string[] | string;
}

export type NestedOption = ClassificationOption & {
  options?: Array<ClassificationOption | NestedOption>;
};

export interface NestedClassificationField extends ClassificationField {
  options: NestedOption[];
}

export type DropdownItemProps = {
  depth: number;
  options: NestedOption[];
};

export type DropdownContainerProps = {
  backgroundColor: string;
};

export type DropdownProps = {
  highlighted: boolean;
  answer: string[];
  onAnswer: OnAnswer;
  field: NestedClassificationField;
};

export type OptionProps = {
  first: boolean;
  depth: number;
  onOpen: (v: string) => void;
  openOption: string;
  onAnswer: OnAnswer;
  label: string;
  value: string;
  options?: NestedOption[];
};

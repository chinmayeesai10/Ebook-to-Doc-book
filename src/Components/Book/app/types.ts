export type DropdownProps = {
  dropdownPath: number[];
  onClose: () => void;
  classification: Classification;
  onDropdownClick: (index: number) => void;
  onChange: (c: Classification) => void;
  insertXml: any;
  updateXml: any;
  deleteXml: any;
};

export interface OptionFieldProps {
  label: string;
  onChange: (props: any) => void;
  onEnter: () => void;
  remove: () => void;
  isDropdown: boolean;
  onDropdownClick: () => void;
  options?: DropdownOption[];
  dropdownPath: any;
}

export enum ToolFieldType {
  line = "line",
  polygon = "polygon",
  rectangle = "rectangle",
  point = "point",
  superpixel = "superpixel"
}

export type OptionProps = {
  value: string;
  label: string;
};

export enum ClassificationFieldType {
  checklist = "checklist",
  radio = "radio",
  text = "text",
  dropdown = "dropdown"
}

export interface Classification {
  name: string;
  instructions: string;
  type: ClassificationFieldType;
  options: (OptionProps | DropdownOption)[];
  required?: boolean;
}

export interface Tool {
  name: string;
  label?: string;
  color: string;
  tool: ToolFieldType;
  classifications?: Classification[];
}

export enum TemplateModes {
  segmentation = "segmentation",
  pixelwise = "pixelwise"
}

export type ImageLabelingFormConfiguration = {
  projectInstructions?: string;
  tools?: Tool[];
  classifications?: Classification[];
};

export type DropdownOption = {
  value: string;
  label: string;
  options?: DropdownOption[];
};

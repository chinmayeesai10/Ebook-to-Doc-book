import { OptionProps, DropdownOption } from './types';

function getOptionErrorInstructions(option: OptionProps | DropdownOption) {
  if (!option.value) {
    throw new Error('Options must have a value');
  }

  if (!option.label) {
    throw new Error('Options must have a label');
  }
}

export function getDropdownErrorInstructions(options: DropdownOption[]) {
  options.map(getOptionErrorInstructions);
}

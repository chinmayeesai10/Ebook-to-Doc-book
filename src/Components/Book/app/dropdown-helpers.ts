import { DropdownOption } from "./types";

export const addDropdownOption = (
  options: DropdownOption[] = [],
  path: number[],
  insertXml: any
): DropdownOption[] => {
  if (path.length === 0) {
    const emptyOption = {
      label: "",
      value: "",
      options: []
    };

    return [...options, emptyOption];
  }

  const index = path[0];
  const optionToTraverse = options[index];
  if (insertXml != null) insertXml(path);

  return [
    ...options.slice(0, index),
    {
      ...optionToTraverse,
      options: addDropdownOption(optionToTraverse.options, path.slice(1), null)
    },
    ...options.slice(index + 1)
  ];
};

export const removeDropdownOption = (
  options: DropdownOption[] = [],
  path: number[],
  indexToRemove: number,
  deleteXml : any
): DropdownOption[] => {

  if (path.length === 0) {
    return [
      ...options.slice(0, indexToRemove),
      ...options.slice(indexToRemove + 1)
    ];
  }

  const index = path[0];
  const optionToTraverse = options[index];
  if (deleteXml != null) deleteXml(path, indexToRemove);
  return [
    ...options.slice(0, index),
    {
      ...optionToTraverse,
      options: removeDropdownOption(
        optionToTraverse.options,
        path.slice(1),
        indexToRemove,
        null
      )
    },
    ...options.slice(index + 1)
  ];
};

export const updateDropdownOption = (
  options: DropdownOption[] = [],
  path: number[],
  indexToUpdate: number,
  payload: DropdownOption,
  updateXml: any
): DropdownOption[] => {
  if (path.length === 0) {
    return [
      ...options.slice(0, indexToUpdate),
      payload,
      ...options.slice(indexToUpdate + 1)
    ];
  }
  /* updateXml to be called somewhere here! */
  const index = path[0];
    const optionToUpdate = options[index];
    if (updateXml != null) updateXml(path, payload, indexToUpdate);
  return [
    ...options.slice(0, index),
    {
      ...optionToUpdate,
      options: updateDropdownOption(
        optionToUpdate.options,
        path.slice(1),
        indexToUpdate,
        payload,
        null
      )
    },
    ...options.slice(index + 1)
  ];
};

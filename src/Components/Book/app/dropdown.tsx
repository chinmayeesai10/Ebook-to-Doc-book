import * as React from "react";
import { SideBarStyles, StyledError } from "./styled-components";
import { Button, Icon } from "@material-ui/core";
import { DropdownOption, DropdownProps } from "./types";
import { OptionField } from "./option-field";
import { Column } from "../ui";
import { getDropdownErrorInstructions } from "./edit-template-selectors";
import {
  updateDropdownOption,
  addDropdownOption,
  removeDropdownOption
} from "./dropdown-helpers";
import {
  OptionRow,
  SettingsTitle,
  OptionHeader,
  AddOption,
  Spacer,
  FixedHeight
} from "./styled-components";

const traverseToCurrentPage = (
  options: DropdownOption[] = [],
  path: number[]
): DropdownOption[] => {
  if (path.length === 0) {
    return options;
  }

  const currentOptionsIndex = path[0];
  const currentOptions = options[currentOptionsIndex].options;

  return traverseToCurrentPage(currentOptions, path.slice(1));
};

const getTitle = (
  options: DropdownOption[] = [],
  dropdownPath: number[]
): string => {
  const index = dropdownPath[0];

  if (dropdownPath.length === 1) {
    return options[index].label;
  }

  const prefix = options[index].label;
  const suffix = getTitle(options[index].options, dropdownPath.slice(1));

  return `${prefix} > ${suffix}`;
};

function convertLabelToValue(str: string) {
  return str.toLowerCase().replace(/ /g, "_");
}

export function Dropdown({
  dropdownPath,
  onClose,
  classification,
  onDropdownClick,
  onChange,
  insertXml,
  updateXml,
  deleteXml
}: DropdownProps) {
  const topLevelOptions = classification.options;
  const displayOptions = traverseToCurrentPage(topLevelOptions, dropdownPath);

  const updateDropdown = (dropdownOptions: DropdownOption[]): void => {
    return onChange({
      ...classification,
      options: dropdownOptions
    });
  };

  const onDropdownChange = (index: number) => (option: DropdownOption) => {
    updateDropdown(
      updateDropdownOption(
        topLevelOptions,
        dropdownPath,
        index,
        {
          label: option.label,
          value: convertLabelToValue(option.value),
          options: option.options || []
        },
        updateXml
      )
    );
  };

  const onAddDropdown = () => {
    updateDropdown(addDropdownOption(topLevelOptions, dropdownPath, insertXml));
  };

  const onRemoveDropdown = (index: number) => () => {
    var new_options = removeDropdownOption(topLevelOptions, dropdownPath, index, deleteXml);
    updateDropdown(new_options);
  };

  const optionFields = (displayOptions || []).map((option: any, i: number) => {
    return (
      <OptionRow key={i}>
        <OptionField
          {...option}
          onChange={onDropdownChange(i)}
          onEnter={onAddDropdown}
          remove={onRemoveDropdown(i)}
          isDropdown={true}
          onDropdownClick={() => onDropdownClick(i)}
          dropdownPath={dropdownPath}
          index={i}
        />
      </OptionRow>
    );
  });

  const generateErrorMessage = (options: DropdownOption[]) => {
    try {
      getDropdownErrorInstructions(options);
    } catch (e) {
      return e.message;
    }
  };

  const errorMessage = generateErrorMessage(displayOptions);

  return (
    <SideBarStyles>
      <SettingsTitle>
        {getTitle(topLevelOptions, dropdownPath) }
      </SettingsTitle>
      <Column>
        <div
          style={{
            margin: "15px",
            overflowY: "auto"
          }}
        >
          <OptionHeader>Options</OptionHeader>
          {optionFields}
          <AddOption onClick={onAddDropdown}>
            <Icon style={{ marginRight: "5px", fontSize: "12px" }}>+</Icon>
            <div style={{ fontSize: "14px" }}>Add Option</div>
          </AddOption>
        </div>
      </Column>
      <Spacer />
      <FixedHeight>
        <StyledError shouldDisplayErrors={!!errorMessage}>
          {errorMessage}
        </StyledError>
        <Button
          style={{ width: "100%", height: "70px", fontSize: "16px" }}
          variant={"contained"}
          color="primary"
          onClick={onClose}
          disabled={Boolean(errorMessage)}
        >
          Done
        </Button>
      </FixedHeight>
    </SideBarStyles>
  );
}

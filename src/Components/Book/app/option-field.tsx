import * as React from 'react';
import { Input } from '@material-ui/core';
import RTFInput from './RTFInput'
import {Delete, ChevronRight} from '@material-ui/icons';
import { OptionFieldProps } from './types';
import { StyledOptionField, Spacer, StyledIcon } from './styled-components';

function convertLabelToValue(str: string) {
  return str.toLowerCase().replace(/ /g, '_');
}

export function OptionField({
  label,
  onChange,
  onEnter,
  remove,
  isDropdown,
  onDropdownClick,
  options,
  dropdownPath,
}: OptionFieldProps) {
  console.log(label)
  console.log(dropdownPath)
  return (
    <StyledOptionField>
      {dropdownPath.length==2?
      <RTFInput
        placeholder="New para"
        onChange={onChange}
        options={options}
        value={label}
        onKeyUp={(e:any) => e.key === 'Enter' && onEnter()}
      />:
      <Input
        placeholder="New chapter"
        style={{ fontSize: '14px', display: 'block' }}
        onChange={(e) =>
          onChange({
            value: convertLabelToValue(e.target.value),
            label: e.target.value,
            options
          })
        }
        onKeyUp={(e) => e.key === 'Enter' && onEnter()}
        value={label}
      />
      }
      <Spacer />
      {/* <StyledIcon onClick={remove}>delete</StyledIcon> */}
      <Delete onClick={remove}/>
      {isDropdown && (
        // <StyledIcon onClick={label.length ? onDropdownClick : () => null}>
        //   chevron_right
        // </StyledIcon>
        <ChevronRight onClick={label.length ? onDropdownClick : () => null}/>
      )}
    </StyledOptionField>
  );
}

import styled from 'styled-components';
import { textColor, primary } from '../ui';
import { List, Typography } from '@material-ui/core';
import { DropdownContainerProps, DropdownItemProps } from './types';

export const LabelControlGrouping = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  padding: 12px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  color: ${({ highlighted }: { highlighted: boolean }) =>
    highlighted ? '#fff' : textColor};
  background-color: ${({ highlighted }) => (highlighted ? primary : 'inherit')};
  border-bottom: 1px solid #e0e0e0;
  box-shadow: #00000099 0px 0px 10px;
`;

export const DropdownList = styled(List)`
  && {
    border-radius: 3px;
    background-color: #fff;
    color: #5b5b5b;
    margin-top: 10px;
  }
`;

export const DropdownContainer = styled.div`
  border-top: 1px solid #e0e0e0;
  background-color: ${(p: DropdownContainerProps) => p.backgroundColor};
`;

export const DropdownItem = styled(Typography)`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: ${(p: DropdownItemProps) => p.depth * 8}px;
  max-width: ${(p) => 225 - p.depth * 8 - (p.options.length ? 25 : 0)}px;
  box-sizing: border-box;
`;

export const StyledAnswer = styled(Typography)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  max-width: 220px;
`;

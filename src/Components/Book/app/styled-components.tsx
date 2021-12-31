import styled, { StyledFunction } from 'styled-components';
import { divider, textColor, primary, iconColor } from '../ui';
import { Icon } from '@material-ui/core';

export const SettingsTitle = styled.div`
  padding: 20px 15px;
  background-color: ${divider};
  font-size: 22px;
  color: ${textColor};
  font-weight: 300;
`;

export const OptionRow = styled.div`
  display: flex;
  padding-bottom: 4px;
`;

export const Root = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

export const SideBarStyles = styled.div`
  flex: 1;
  display: flex;
  margin-right: 10px;
  box-shadow: #c5c4c4 2px 0 5px;
  flex-direction: column;
  border: 1px solid rgba(153, 153, 153, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
`;

const styledError: StyledFunction<
  {
    shouldDisplayErrors: boolean;
    children: any;
  } & any
> = styled.div;

export const StyledError = styledError`
  visibility: ${(p: any) => (p.shouldDisplayErrors ? '' : 'hidden')};
  color: red;
  display: flex;
  justify-content: flex-start;
  margin: 10px 10px;
`;

export const StyledOptionField = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  background-color: #efefef;
`;

export const StyledIcon = styled(Icon)`
  cursor: pointer;
  color: ${iconColor};
`;

export const AddOption = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${primary};
  margin: 10px 0px;
`;

export const OptionHeader = styled.div`
  font-size: 16px;
  color: #0000008a;
  margin-bottom: 4px;
`;

export const FixedHeight = styled.div`
  flex: 0 0 auto;
`;

export const Spacer = styled.div`
  display: flex;
  flex-grow: 1;
`;

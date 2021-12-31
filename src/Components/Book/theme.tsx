import * as React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import lightblue from '@material-ui/core/colors/lightBlue';

export const primary = '#2195f3';
export const secondary = '#c1c1c1';
export const divider = '#efefef';
export const secondaryError = '#F48FB1';
export const textColor = '#5b5b5b';
export const iconColor = '#9b9b9b';

const theme = createMuiTheme({
  palette: {
    primary: {
      ...lightblue,
      A700: primary,
      contrastText: '#FFF'
    }
  }
});

export const ThemeProvider: React.FC<{}> = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

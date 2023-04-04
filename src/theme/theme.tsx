import React, { useMemo } from 'react';
import { createGlobalStyle, DefaultTheme, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { getTheme } from '@/theme/index';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = true;
  const themeObject = useMemo(() => getTheme(darkMode), [darkMode]);
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
}

export const ThemedGlobalStyle = createGlobalStyle`
  #root {
    font-family: Source Code Pro !important;
  }

  html{
    font-size: 16px;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.bg1};

    h3 {
      font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fontSizes.h3};
      line-height: ${({ theme }: { theme: DefaultTheme }) => theme.lineHeight.h3};
    }
    h5 {
      font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fontSizes.h5};
      line-height: ${({ theme }: { theme: DefaultTheme }) => theme.lineHeight.h5};
    }

  }

  summary::-webkit-details-marker {
    display:none;
  }



`;

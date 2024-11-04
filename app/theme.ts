// theme.ts

"use client";

import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#E0D3FF',  // Light color
          100: '#CDB8FF', // Slightly darker
          200: '#B595FF', // Medium color   
          300: '#A179FF', // More pronounced color
          400: '#9060FF', // Strong color
          500: '#7E47FF', // Main color
          600: '#6F35F5', // Darker shade
          700: '#6026E8', // Even darker
          800: '#4D12D8', // Very dark
          900: '#3A06B2', // Darkest
        },
      },
    },
  },
  components: {
    JoyTab: {
        styleOverrides: {
          root: {
            // Customize the default tab style
            '&.Mui-selected': {
              backgroundColor: '#FF00DD', // Active background color
              color: '#000', // Active text color
            },
            '&:hover': {
              backgroundColor: 'darkviolet', // Background color on hover
            },
          },
        },
      },
    JoyButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#FF00DD', // Default background color
          color: '#FF00DD',             // Default text color
          borderRadius: '8px',        // Default border radius
          '&:hover': {
            backgroundColor: 'darkviolet', // Hover background color
          },
        },
      },
    },
  },
});

export default theme;
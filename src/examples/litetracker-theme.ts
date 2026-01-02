import { createTheme } from '@mui/material/styles';

// Extend the theme to include custom palette colors
declare module '@mui/material/styles' {
  interface Palette {
    sidebar: Palette['primary'];
    column: Palette['primary'];
  }
  interface PaletteOptions {
    sidebar?: PaletteOptions['primary'];
    column?: PaletteOptions['primary'];
  }
  interface TypeAction {
    brownHover: string;
    orangeHover: string;
    orangeSelected: string;
    orangeSelectedHover: string;
  }
}

// Extend Button component to support custom variants
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    columnAction: true;
  }
}

const liteTrackerTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E67E22', // Amplify orange - Top nav, column headers
      light: '#F39C12',
      dark: '#D35400',
      contrastText: '#2C2416', // Dark brown for better contrast on orange
    },
    secondary: {
      main: '#F4A261', // Warm peach accent
      light: '#F6B481',
      dark: '#E88F4C',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#C0392B', // Darker red for better contrast
    },
    warning: {
      main: '#F39C12', // Warm amber for stars/priority
    },
    success: {
      main: '#27AE60', // Slightly darker green
    },
    background: {
      default: '#2C2416', // Warm dark brown (complements orange)
      paper: '#FFFFFF',   // Story cards
    },
    sidebar: {
      main: '#3D2E1F',    // Warm dark brown for sidebar
      contrastText: '#FFFFFF',
    },
    column: {
      main: '#4A3827',    // Medium warm brown for columns
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#D4B896', // Warm tan for secondary text
      disabled: '#A89680', // Warm gray for disabled text
    },
    divider: '#5C4A38', // Warm brown divider
    action: {
      active: 'rgba(255, 255, 255, 0.56)',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)',
      brownHover: 'rgba(44, 36, 22, 0.12)', // Dark brown overlay for buttons on orange backgrounds
      orangeHover: 'rgba(230, 126, 34, 0.08)', // Light orange overlay
      orangeSelected: 'rgba(230, 126, 34, 0.25)', // Medium orange for selected state
      orangeSelectedHover: 'rgba(230, 126, 34, 0.35)', // Darker orange for selected hover
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161',
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontSize: 14,
      fontWeight: 500,
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
    },
    body2: {
      fontSize: 13,
      fontWeight: 400,
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
    },
  },

  spacing: 8, // 8px base unit

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#E67E22', // Amplify orange
          height: 50,
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '50px !important',
          height: 50,
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#3D2E1F', // Warm dark brown
          width: 190,
          borderRight: 'none',
          overflowX: 'hidden',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: 4,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 12,
          '&:last-child': {
            paddingBottom: 12,
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: 11,
          height: 20,
          borderRadius: 3,
          fontWeight: 500,
        },
        sizeSmall: {
          fontSize: 10,
          height: 18,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
        sizeSmall: {
          fontSize: 12,
          padding: '4px 8px',
        },
      },
      variants: [
        {
          props: { variant: 'columnAction' },
          style: {
            minWidth: 'auto',
            padding: '4px 8px',
            fontSize: 12,
            color: '#FFFFFF',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
        },
      ],
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 6,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
        sizeSmall: {
          padding: 4,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16,
          paddingRight: 16,
          '&:hover': {
            backgroundColor: theme.palette.action.orangeHover,
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.orangeSelected,
            '&:hover': {
              backgroundColor: theme.palette.action.orangeSelectedHover,
            },
          },
        }),
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 36,
          color: '#FFFFFF',
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: 400,
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 50,
        },
        indicator: {
          backgroundColor: '#FFFFFF',
          height: 3,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'uppercase',
          fontSize: 12,
          fontWeight: 500,
          minHeight: 50,
          color: 'rgba(44, 36, 22, 0.7)', // Dark brown with opacity
          '&.Mui-selected': {
            color: theme.palette.primary.contrastText,
          },
          '&:hover': {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.action.brownHover,
          },
        }),
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.09)',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFFFFF',
            },
          },
          '& .MuiInputBase-input': {
            fontSize: 14,
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#3D2E1F', // Warm dark brown
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: 14,
          '&:hover': {
            backgroundColor: theme.palette.action.orangeHover,
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.orangeSelected,
            '&:hover': {
              backgroundColor: theme.palette.action.orangeSelectedHover,
            },
          },
        }),
      },
    },
  },
});

export default liteTrackerTheme;

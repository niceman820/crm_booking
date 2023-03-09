// import { createTheme } from "@mui/material/styles";

// import colors from "./base/color";


// export default createTheme({
//   palette: {...colors}
// });

import { grey, blue, common } from '@mui/material/colors';

const palette = {
  light: {
    primary: {
      main: '#009EF7',
      light: '#009EF7',
      // dark: '#00765A',
    },
    success: {
      main: '#50CD89',
      light: '#50CD89',
    },
    error: {
      main: '#F1416C',
      light: '#F1416C',
    }
  },
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        primary: {
          main: palette.light.primary.main,
          light: palette.light.primary.light,
          dark: palette.light.primary.dark,
        },

        success: {
          main: palette.light.success.main,
        },

        error: {
          main: palette.light.error.main,
        },

        divider: grey[300],
        text: {
          primary: grey[500],
          secondary: grey[800],
        },
      }
      : {
        primary: {
          main: palette.light.primary.main,
          default: '#1e1e2d'
        },
        success: {
          main: palette.light.success.main,
        },
        error: {
          main: palette.light.error.main,
        },
        background: {
          default: '#1e1e2d',
          paper: '#1e1e2d',
        },
        text: {
          default: '#fff',
          paper: '#fff'
        },
        // divider: deepOrange[700],
        // background: {
        //   default: deepOrange[900],
        //   paper: deepOrange[900],
        // },
        // text: {
        //   primary: '#fff',
        //   // secondary: grey[500],
        // },
      }),
  },
  typography: {
    fontFamily: [
      'Oswald',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    body1: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
  },
});

export const getThemedComponents = (mode) => ({
  components: {
    ...(mode === 'light'
      ? {
        MuiAppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: grey[800],
            },
          },
        },
        MuiLink: {
          variant: 'h3',
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              background: '#f5f8fa',
              borderColor: '#f5f8fa',
            }
          }
        },
        // MuiButton: {
        //   styleOverrides: {
        //     root: {
        //       borderRadius: 0,
        //       color: common.white,
        //       fontFamily:
        //         "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
        //       fontSize: 20,
        //       borderWidth: 2,
        //       '&:hover': {
        //         borderWidth: 2,
        //       },
        //     },
        //   },
        //   variants: [
        //     {
        //       props: { variant: 'contained' },
        //       style: {
        //         fontFamily:
        //           "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
        //       },
        //     },
        //     {
        //       props: { variant: 'outlined' },
        //       style: {
        //         color: palette.light.primary.main,
        //       },
        //     },
        //     {
        //       props: { variant: 'primary', color: 'primary' },
        //       style: {
        //         border: '4px dashed blue',
        //       },
        //     },
        //   ],
        // },
        MuiList: {
          styleOverrides: {
            root: {},
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              color: common.white,
              alignItems: 'stretch',
              fontFamily:
                "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
            },
          },
        },
        MuiAccordion: {
          styleOverrides: {
            root: {
              color: common.white,
              fontFamily:
                "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
            },
          },
        },
      }
      : {
        MuiAppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: blue[800],
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "unset"
            }
          }
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              background: '#1b1b29',
              borderColor: '#1b1b29',
            },
            focus: {
              background: '#1f1f2f'
            }
          }
        },
        MuiTypography: {
          styleOverrides: {
            root: {
              color: '#fff'
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              color: '#fff'
            }
          }
        },
        // MuiCardHeader: {
        //   styleOverrides: {
        //     root: {
        //       backgroundColor: '#212E48',
        //     }
        //   }
        // },
      }),
  },
});
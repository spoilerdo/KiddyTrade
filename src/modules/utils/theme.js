import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark',

        primary: {
            main: '#272727',
            contrastText: '#FCFCFC'
        },
        secondary: {
            main: '#FDAF05',
            contrastText: '#272727'
        },
    },
    typography: {
        body1: {
            fontSize: 18,
        },
        body2: {
            fontSize: 17,
        },
      },
});

export default theme;
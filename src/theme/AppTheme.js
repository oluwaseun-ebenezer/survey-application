import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { deepOrange, orange } from "@material-ui/core/colors";

const appTheme = createMuiTheme({
    palette: {
        primary: {
            main: orange[500],
        },
    },
    default: {
        background:{
            dark: '#FF0000',
            light: '#FFFFFF',
            black: 'black',
        },
        font:{
            dark: '#FFFFFF',
            black: 'black',
        }
    }
});

export default appTheme;

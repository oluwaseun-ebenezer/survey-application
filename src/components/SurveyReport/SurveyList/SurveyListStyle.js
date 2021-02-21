import { makeStyles } from '@material-ui/core/styles';

const UserListStyles = makeStyles((theme) => ({
    outerContainer: {
        width: '100%',
        maxWidth: '100%',
        // [`@media (min-width:${700}px)`]: {
        //     width: '50vw',
        //     maxWidth: '50px',
        // },ter',
    },
    mainContainer: {
        width: '100%',
        maxWidth: '100%',
        maxHeight: '500px',
        overflow: 'scroll',
        // [`@media (min-width:${700}px)`]: {
        //     width: '50vw',
        //     maxWidth: '50px',
        // },ter',
    },
    table: {
        width: '100%',
        margin: '20px 0',
        borderCollapse: 'collapse',
        fontSize: '0.8em',
        boxShadow: '0 8px 6px -6px rgba(0, 0, 0, 0.247)',
        '-webkit-box-shadow': '0 8px 6px -6px rgba(0, 0, 0, 0.247)',
        '-moz-box-shadow': '0 8px 6px -6px rgba(0, 0, 0, 0.247)',

        '& > thead > tr > th': {
            padding: '10px',
            textAlign: 'left',
            border: '1px solid rgba(0, 0, 0, 0.2)',
        },
        '& > tbody > tr > td': {
            padding: '10px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
        },
        '& > thead > tr > th:nth-child(3)': {
            textAlign: 'center',
        },
        '& > tbody > tr > td:nth-child(3)': {
            textAlign: 'center',
        },
        '& > tbody > tr > td:nth-child(1)': {
            width: '30%',
            minWidth: 'calc(250px - 20px)',
            maxWidth: 'calc(350px - 20px)',
        },
        '& > tbody > tr > td:nth-child(2)': {
            width: '60%',
            minWidth: 'calc(350px - 20px)',
            maxWidth: 'calc(600px - 20px)',
        },
        '& > tbody > tr > td:nth-child(3)': {
            width: '10%',
            minWidth: 'calc(250px - 20px)',
            maxWidth: 'calc(350px - 20px)',
            textAlign: 'center',
        },
    },
    heading: {
        fontWeight: 'bold',
    },
    redButton: {
        margin: '0 10px',
        height: '40px',
        fontSize: '1em',
        // backgroundColor: theme.default.background.dark,
        color: 'white',
        backgroundColor: 'red',
        fontWeight: 'bold',
    },
    cyanButton: {
        margin: '0 10px',
        height: '40px',
        fontSize: '1em',
        // backgroundColor: theme.default.background.dark,
        color: 'white',
        backgroundColor: 'cyan',
        fontWeight: 'bold',
    },
    greenButton: {
        margin: '0 10px',
        height: '40px',
        fontSize: '1em',
        // backgroundColor: theme.default.background.dark,
        color: 'white',
        backgroundColor: 'green',
        fontWeight: 'bold',
    },
    allowInput: {
        border: '1px solid rgba(0, 0, 0, 0.2)',
        width: 'calc(100% - 20px)',
        padding: '10px'
    },
    input: {
        border: 0,
        width: 'calc(100% - 20px)',
        padding: '10px'
    },
}));

export default UserListStyles;
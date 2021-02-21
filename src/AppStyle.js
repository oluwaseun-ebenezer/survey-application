import { makeStyles } from '@material-ui/core/styles';

const appStyles = makeStyles((theme) => ({
    outerContainer: {
        width: 'calc(100vw - 202px)',
        maxWidth: '1200px',
        minheight: '100vh',
        margin: '50px',
        padding: '50px 50px',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        border: '1px solid rgba(0, 0, 0, 0.2)',
    },
    [`@media (max-width:${800}px)`]: {
        outerContainer: {
            width: 'calc(100vw - 82px)',
            maxWidth: 'calc(100vw - 82px)',
            margin: '20px',
            padding: '50px 20px',
        }
    },
    error:{
        backgroundColor: '#EC4646',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '10px',
    },
    success:{
        backgroundColor: '#16C79A',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '10px',
    }
}));

export default appStyles;
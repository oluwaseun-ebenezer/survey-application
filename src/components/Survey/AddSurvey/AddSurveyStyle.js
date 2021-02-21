import { makeStyles } from '@material-ui/core/styles';

const AddUserStyles = makeStyles((theme) => ({
    outerContainer: {
        width: '100%',
        maxWidth: '100%',
    },
    form: {
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '3px',
        padding: '10px',
    },
    input: {
        marginRight: '20px',
    },
    blueButton: {
        backgroundColor: '#1A508B',
        color: 'white',
        height: '40px',
        '&:hover': {
            backgroundColor: '#1A508B',
        }
    },
    [`@media (max-width:${800}px)`]: {
        form: {
            display: 'flex',
            flexFlow: 'column',
        },
        input: {
            marginBottom: '20px',
            marginRight: 0,
        }
    },
}));

export default AddUserStyles;
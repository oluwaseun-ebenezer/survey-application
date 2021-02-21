import { makeStyles } from '@material-ui/core/styles';

const HeaderStyles = makeStyles((theme) => ({
    outerContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        maxWidth: '100%',
        [`@media (max-width:${900}px)`]: {
            '& > span': {
                marginBottom: '20px',
            },
            flexFlow: 'column',
            alignItems: 'flex-start',
            '& > span:nth-child(2)': {
                alignSelf: 'center',
            },
            '& > span:nth-child(3)': {
                alignSelf: 'flex-end',
            }
        },
    },
    heading: {
        fontWeight: 'bold',
        textDecoration: 'underline',
        fontSize: '2em',
    },
}));

export default HeaderStyles;
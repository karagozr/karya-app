import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import LogoMenu from '../images/logo-sidebar.png'


import { loginAction,logoutAction } from '../redux';

import { useDispatch} from 'react-redux'

const Copyright = () =>(
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
)


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export const LoginPage = (props) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logoutAction())
    }, [dispatch]);
    
    const [loginParams, setLoginParams] = useState({username:'',password:''});
    const [isSubmit, setIsSubmit] = useState(false);

    const classes = useStyles();

    const handleChange = (e) => {
        setIsSubmit(false);
        const { name, value } = e.target;
        setLoginParams({...loginParams, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        const { username, password } = loginParams;
        if (username && password) {
            dispatch(loginAction({
                userName: username,
                password: password
              }))
    
        }
    }

    

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                
                <Typography component="h1" variant="h5">
                <img src={LogoMenu} alt="Logo"></img> 
                </Typography>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Kullanıcı Adı"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        error={isSubmit&&!loginParams.username}
                        value={loginParams.username}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Parola"
                        type="password"
                        id="password"
                        error={isSubmit&&!loginParams.password}
                        value={loginParams.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Beni hatırla"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Giriş
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Şifremi Unuttum?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register" className="btn btn-link" variant="body2"> {"Kullanıcın yok mu?"}</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

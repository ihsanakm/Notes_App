// LoginForm.js
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "./redux/userAction";
import { Box, TextField, Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();



function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logIn, setLogIn] = useState({
    email: "",
    password: "",
  });

  function handleLogin(e) {
    const { name, value } = e.target;
    setLogIn({
      ...logIn,
      [name]: value,
    });
  }

  async function handleLogInSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/login", logIn, { withCredentials: true });
      console.log(res)
      dispatch(userLoggedIn());
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  // Render the LoginForm component
  return (
<>
<>
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#0288d1' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleLogInSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            onChange={handleLogin}
            value={logIn.email}
            type="email"
            name="email"

          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleLogin}
            value={logIn.password}

          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container  justifyContent="flex-end">
            <Grid item xs>
            </Grid>
            <Grid item >
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
  </>


    <div>
      {/* <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="on"
      >
          <TextField
            required
            id="outlined-required"
            label="Email"
            onChange={handleLogin}
            value={logIn.email}
            type="email"
            name="email"
          />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={handleLogin}
            value={logIn.password}
            name="password"
          />
          <Button onClick={handleLogInSubmit} variant="contained" type="submit">
            Submit
          </Button>
      </Box> */}

    </div>
    </>
  );
}

export default LoginForm;

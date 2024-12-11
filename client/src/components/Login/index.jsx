//// client/src/components/Login/index.jsx
//import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
//import CssBaseline from '@mui/material/CssBaseline';
//import TextField from '@mui/material/TextField';
//import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
//import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import Typography from '@mui/material/Typography';
//import Container from '@mui/material/Container';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { useState } from 'react';
//import axios from "axios";
//import { useNavigate } from "react-router-dom";
//
//const defaultTheme = createTheme();
//
//export default function Login() {
//  const navigate = useNavigate();
//  const [data,setData]  = useState({
//    email : "",
//    password : ""
//  })
//  const [error,setError] =useState("")
//  const handleChange = (event) =>{
//    // console.log(event.target)
//    setData({...data, [event.currentTarget.name] : event.target.value })
//  }
//  const handleSubmit = async (event) => {
//    event.preventDefault();
//    try{
//      const url = "http://localhost:8080/api/auth"
//      const res= await axios.post(url,data)
//      localStorage.setItem("token",res.data.token);
//      // console.log(res.data.token);
//      navigate('/home')
//      window.location.reload();
//    }catch(error){
//      if (
//				error.response &&
//				error.response.status >= 400 &&
//				error.response.status <= 500
//			) {
//				setError(error.response.data.message);
//			}
//    }
//    
//  };
//
//  return (
//    <ThemeProvider theme={defaultTheme}>
//      <Container component="main" maxWidth="xs">
//        <CssBaseline />
//        <Box
//          sx={{
//            marginTop: 8,
//            display: 'flex',
//            flexDirection: 'column',
//            alignItems: 'center',
//          }}
//        >
//          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//            <LockOutlinedIcon />
//          </Avatar>
//          <Typography component="h1" variant="h5">
//            Sign in
//          </Typography>
//          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//            <TextField
//              margin="normal"
//              required
//              fullWidth
//              onChange={handleChange}
//              id="email"
//              label="Email Address"
//              name="email"
//              autoComplete="email"
//              autoFocus
//            />
//            <TextField
//              margin="normal"
//              required
//              fullWidth
//              onChange={handleChange}
//              name="password"
//              label="Password"
//              type="password"
//              id="password"
//              autoComplete="current-password"
//            />
//            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
//            <Button
//              type="submit"
//              fullWidth
//              variant="contained"
//              sx={{ mt: 3, mb: 2 }}
//            >
//              Sign In
//            </Button>
//            <Grid container>
//              
//              <Grid item>
//                <Link href="/signup" variant="body2">
//                  {"Don't have an account? Sign Up"}
//                </Link>
//              </Grid>
//            </Grid>
//          </Box>
//        </Box>
//        
//      </Container>
//    </ThemeProvider>
//  );
//}



import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setData({ ...data, [event.currentTarget.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const res = await axios.post(url, data);
      localStorage.setItem("token", res.data.token);
      navigate('/home');
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError("Invalid email or password");
      }
    }
  };

  return (
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

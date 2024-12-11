//// client/src/components/Signup/index.jsx
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
//import { useState } from "react";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";
//
//
//const defaultTheme = createTheme();
//
//export default function Signup() {
//  const navigate = useNavigate();
//  const [data,setData] = useState({
//    firstName : "",
//    lastName : "",
//    email : "",
//    password : ""
//  })
//  const [error,setError] = useState("")
//  const handleChange = (event)=>{
//    console.log(event.target.value);
//    setData({...data, [event.currentTarget.name] : event.target.value })
//  }
//  const handleSubmit = async (event) => {
//    event.preventDefault();
//    // console.log(data)
//    try{
//     const url = "http://localhost:8080/api/users"
//     const res = await axios.post(url,data);
//     console.log("response from server :",res)
//     navigate("/login")
//    }catch(error)
//    {
//      if(error.response && error.response.status>=400 && error.response.status<=500)
//      setError(error.response.data.message)
//    }
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
//            Sign up
//          </Typography>
//          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//            <Grid container spacing={2}>
//              <Grid item xs={12} sm={6}>
//                <TextField
//                  autoComplete="given-name"
//                  onChange={handleChange}
//                  name="firstName"
//                  required
//                  fullWidth
//                  id="firstName"
//                  label="First Name"
//                  autoFocus
//                />
//              </Grid>
//              <Grid item xs={12} sm={6}>
//                <TextField
//                  required
//                  fullWidth
//                  onChange={handleChange}
//                  id="lastName"
//                  label="Last Name"
//                  name="lastName"
//                  autoComplete="family-name"
//                />
//              </Grid>
//              <Grid item xs={12}>
//                <TextField
//                  required
//                  fullWidth
//                  onChange={handleChange}
//                  id="email"
//                  label="Email Address"
//                  name="email"
//                  autoComplete="email"
//                />
//              </Grid>
//              <Grid item xs={12}>
//                <TextField
//                  required
//                  fullWidth
//                  onChange={handleChange}
//                  name="password"
//                  label="Password"
//                  type="password"
//                  id="password"
//                  autoComplete="new-password"
//                />
//              </Grid>
//             
//            </Grid>
//            {error && <div>{error}</div>}
//            <Button
//              type="submit"
//              fullWidth
//              variant="contained"
//              sx={{ mt: 3, mb: 2 }}
//            >
//              Sign Up
//            </Button>
//            <Grid container justifyContent="flex-end">
//              <Grid item>
//                <Link href="/login" variant="body2">
//                  Already have an account? Sign in
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

// client/src/components/Signup/index.jsx
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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setData({ ...data, [event.currentTarget.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const res = await axios.post(url, data);
      console.log("response from server :", res);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  onChange={handleChange}
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

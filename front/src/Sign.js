import { passphrase, cryptography } from '@liskhq/lisk-client';
import { validation } from "@liskhq/lisk-passphrase";
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import mainLogo from'./media/logo.png';
import PiggyBank from './media/PiggyBank.png';


const Sign = () => {

  const [state, updateState] = useState({
    passphrase: '',
});

const handleChange = (event) => {
    const { name, value } = event.target;
    updateState({
        ...state,
        [name]: value,
    });
};

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        HackOnLisk
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const saveCredentialsToStorage = () => {
  const errors = validation.getPassphraseValidationErrors(state.passphrase);
  if(!errors.length)
  { 
          sessionStorage.setItem("Passphrase", (state.passphrase));
          setTimeout(() =>{window.location.reload()
          
  },100);}
  else{
    alert("Incorrect passphrase");
  }
};

const newCredentials = () => {
  const pass = passphrase.Mnemonic.generateMnemonic();
  sessionStorage.setItem("Passphrase", (pass));
  const address = cryptography.getBase32AddressFromPassphrase(sessionStorage.getItem('Passphrase'))
  sessionStorage.setItem("Address",(address));

  updateState({
    ...state,
    passphrase: pass,
});

};

  return (
    <ThemeProvider theme={theme}>
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
          <img  src={mainLogo}  style={{
                            width: "70%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative"
                        }}/>
          <Typography component="h1" variant="h5">
          <br></br>
          <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }}>
                        <img  src={PiggyBank} style={{
                        minWidth: "200px",
                        maxWidth: "500px",
                        }}/>   
                </div>
          </Typography>
          <Box component="form" onSubmit={saveCredentialsToStorage} onChange={handleChange} value={state.passphrase} noValidate sx={{ mt: 1, width: 400,}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="passphrase"
              label="paste your passphrase"
              name="passphrase"
              autoComplete="passphrase"
              autoFocus
            /><NavLink to="/main"
              style={{ 
              textDecoration: 'none',
              }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={saveCredentialsToStorage}
            >
              Log in 
            </Button>
            </NavLink>
            </Box>
            <Button
              type="submit"
              onClick={newCredentials}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Create Account
            </Button>
            <Box
            
            sx={{
            marginTop: 6,
            width: 800,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
            >    
            {sessionStorage.getItem("Passphrase",)}
            </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Sign;
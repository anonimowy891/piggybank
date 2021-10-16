import { cryptography, transactions } from '@liskhq/lisk-client';
import React, { useEffect, useState } from 'react';
import * as api from './api.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { NodeInfoContext, nodeInfoContextDefaultValue } from './context';
import { makeStyles } from '@material-ui/core/styles';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import Chip from '@mui/material/Chip';
import { mainListItems } from './listItems';

import Account from './Account';
import Home from './Home';
import Transfer from './Transfer';
import Defi from './Defi';
import Unlock from './Unlock';
import Main from './Main';
import PiggyBank from './media/PiggyBank.png';


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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const removeCredentialsToStorage = () => {
    sessionStorage.clear();
    window.location.href="/sign"
    setTimeout(() =>{window.location.reload()           
    },1000)
};
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

useEffect(async() => {
  await sleep(2000)
  if(sessionStorage.getItem('Account')==null){
  const client = await api.getClient();
  const address = cryptography.getAddressFromPassphrase(sessionStorage.getItem('Passphrase'))

  const tx = await client.transaction.create({
      moduleID: 2,
      assetID: 0,
      fee: BigInt(1000000),
      asset: {
          amount: BigInt(transactions.convertLSKToBeddows("5")),
          recipientAddress: address,
          data: '',
      },
  }, "basic appear remain trust actual lady cattle buzz broken window clinic end"); 
  let res;
  try {
      res = await client.transaction.send(tx);
  } catch (error) {
      res = error;
  }
}
},[])

useEffect(async() => {
  try{
         
  const client = await api.getClient();
  const account = await client.account.get(cryptography.getAddressFromPassphrase(sessionStorage.getItem('Passphrase'))); 
  const data = client.account.toJSON(account)
  sessionStorage.setItem("Account",JSON.stringify(data));

  const address = cryptography.getBase32AddressFromPassphrase(sessionStorage.getItem('Passphrase'))
  sessionStorage.setItem("Address",(address));

  }catch(e) {
    console.log(e);
  }
})

const useStyles = makeStyles((theme) => ({
	appBarLink: {
		margin: theme.spacing(0, 2),
		flex: 1,
	},
	speedDial: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	contentContainer: {
		padding: theme.spacing(5, 0),
	},
	grow: {
		flexGrow: 1,
	},
}));

const classes = useStyles();

  const [nodeInfoState, updateNodeInfoState] = useState(
		nodeInfoContextDefaultValue,
	);

  const updateHeight = async () => {
		const info = await api.fetchNodeInfo();

		updateNodeInfoState({
			height: info.height,
		});
	};

  useEffect(() => {
    async function fetchData() {
      const info = await api.fetchNodeInfo();
      updateNodeInfoState({
        height: info.height,
      });
      setInterval(updateHeight, 2000);
    }
    fetchData();
  }, []);


  return (
    
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1,
              }}
            >
                <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }}>
                        <img  src={PiggyBank} style={{
                        minWidth: "200px",
                        maxWidth: "300px",
                        }}/>   
                </div>
              
            </Typography>
            <NodeInfoContext.Provider value={nodeInfoState}><Chip  label="Network Height" label={nodeInfoState.height} color="success" /></NodeInfoContext.Provider>
            <IconButton color="inherit" sx={{ marginLeft:1, marginRight:1}}>
                <LogoutIcon onClick={removeCredentialsToStorage}/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List >{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12} md={8} lg={20}>
              <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                  }}
                > <Switch>

                    <Route exact path='/main' component={Main} />

                    <Route exact path='/home' component={Home} />
                 
                    <Route exact path='/send-transfer' component={Transfer} />
                  
                    <Route exact path='/send-defi' component={Defi} />
                  
                    <Route exact path='/unlock' component={Unlock} />
              
                    <Route exact path='/account' component={Account} />
                  </Switch>
              </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

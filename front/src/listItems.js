import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SendIcon from '@mui/icons-material/Send';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";




export const mainListItems = (
  <div>
    <NavLink to="/home" 
     activeStyle={{ color: 'black' }}
     style={{ color: 'black', 
     textDecoration: 'none',
     padding: "5px",
     }}
     >
    <ListItem button >
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Account" />
    </ListItem >
    </NavLink>

    <NavLink to="/send-transfer" 
    activeStyle={{ color: 'black' }}
    style={{ color: 'black', 
    textDecoration: 'none',
    padding: "5px",
    }}>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Send Transfer" />
    </ListItem>
    </NavLink>

    <NavLink to="/send-defi" 
    activeStyle={{ color: 'black' }}
    style={{ color: 'black', 
    textDecoration: 'none',
    padding: "5px",
    }}>
    <ListItem button>
      <ListItemIcon>
        <ScheduleSendIcon />
      </ListItemIcon>
      <ListItemText primary="Send to PiggyBank" />
    </ListItem>
    </NavLink>

    <NavLink to="/unlock" 
    activeStyle={{ color: 'black' }}
    style={{ color: 'black', 
    textDecoration: 'none',
    padding: "5px",
    }}>
    <ListItem button>
      <ListItemIcon>
        <LockOpenIcon />
      </ListItemIcon>
      <ListItemText primary="Unlock PiggyBank" />
    </ListItem>
    </NavLink>

    <NavLink to="/account" 
    activeStyle={{ color: 'black' }}
    style={{ color: 'black', 
    textDecoration: 'none',
    padding: "5px",
    }}>
    <ListItem button >
      <ListItemIcon>
        <TravelExploreIcon />
      </ListItemIcon>
      <ListItemText primary="Explore Accounts" />
    </ListItem>
    </NavLink>
  </div>
);

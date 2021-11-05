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
import Account from'./media/Account.png';
import SendPiggy from'./media/Send Piggy.png';
import Transf from'./media/Transfer.png';
import Unloc from'./media/Unloc.png';
import Explore from'./media/Explore.png';






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
      <div style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left"
                }}>
                        <img  src={Account} style={{
                        minWidth: "100px",
                        maxWidth: "150px",
                        }}/>   
                </div>
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
      <div style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left"
                }}>
                        <img  src={Transf} style={{
                        minWidth: "100px",
                        maxWidth: "150px",
                        }}/>   
                </div>
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
      <div style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left"
                }}>
                        <img  src={SendPiggy} style={{
                        minWidth: "100px",
                        maxWidth: "160px",
                        }}/>   
                </div>
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
      <div style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left"
                }}>
                        <img  src={Unloc} style={{
                        minWidth: "100px",
                        maxWidth: "150px",
                        }}/>   
                </div>
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
      <div style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left"
                }}>
                        <img  src={Explore} style={{
                        minWidth: "100px",
                        maxWidth: "150px",
                        }}/>   
                </div>
    </ListItem>
    </NavLink>
  </div>
);

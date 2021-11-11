import { cryptography } from '@liskhq/lisk-client';
import React, { useState } from 'react';
import * as api from './api.js';
import search from'./media/search.png';
import Button from '@mui/material/Button';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Tooltip from '@mui/material/Tooltip';
import Explore from'./media/Explore.png';
import Typography from '@mui/material/Typography';
import {
    Divider,
  } from '@mui/material';


const Account = () => {
    const [state, updateState] = useState({
        address: '',
        account: {
            address:'',
            token: '',
            defi: ''
        },
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        updateState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const client = await api.getClient();
        const account = await client.account.get(cryptography.getAddressFromBase32Address(state.address)); 
        updateState({
            ...state,
            account: client.account.toJSON(account),
        });
    };
    const add = sessionStorage.getItem('Address');
    const addr = `Paste the address you want to see details here.
`;

    return (
        <div >
            <div style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left"
                }}>
                        <img  src={Explore} style={{
                        minWidth: "200px",
                        maxWidth: "220px",
                        }}/>   
                </div>
                <Divider />
                <Divider />
                <Typography 
         
                    color="textSecondary"
                    variant="body3"
                    >
                     <p>Get account details by address.</p>
                </Typography>

            <form onSubmit={handleSubmit}>
                <label>
                <Tooltip title={addr}>
                        <input type="text" id="address" name="address" onChange={handleChange} value={state.address} placeholder="addres…"/>
                </Tooltip>  
                </label>
            </form>
            <br></br>
            <Button variant="contained" onClick={handleSubmit} color="success" endIcon={<PersonSearchIcon />}>
                    Check
            </Button>

            {!state.account.token ? (
            <div >
                
            </div>
    ):(
        <div >
            <Typography 
         
         color="textSecondary"
         variant="body3"
         >
                <p>Address: {add}</p> 
                <p>Binary Address: {state.account.address}</p> 
                <p>Balance: {JSON.stringify(state.account.token.balance/100000000, null, 2)} PIG</p> 
                <p>PiggyBank balance: {JSON.stringify(state.account.defi.locked/100000000, null, 2)} PIG</p> 
                <p>Ready to unlock at block: {JSON.stringify(state.account.defi.end, null, 2)}</p> 
            </Typography>
            </div>
    )}
          



            <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}>
        <img  src={search} style={{
                            width: "40%",
                        }}/>
        </div>
            
        </div>
    );
}
export default Account;

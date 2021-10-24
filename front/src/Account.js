import { cryptography } from '@liskhq/lisk-client';
import React, { useState } from 'react';
import * as api from './api.js';
import search from'./media/search.png';
import Button from '@mui/material/Button';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import Tooltip from '@mui/material/Tooltip';


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

    const addr = `Paste the address you want to see details here.
`;

    return (
        <div >
            <h2>Explore</h2>
            <p>Get account details by address.</p>
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
                <p>Address: {JSON.stringify(state.account.address, null, 2)}</p> 
                <p>Balance: {JSON.stringify(state.account.token.balance/100000000, null, 2)} PIG</p> 
                <p>PiggyBank balance: {JSON.stringify(state.account.defi.locked/100000000, null, 2)} PIG</p> 
                <p>Ready to unlock at block: {JSON.stringify(state.account.defi.end, null, 2)}</p> 
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

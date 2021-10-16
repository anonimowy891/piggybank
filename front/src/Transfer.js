import React, { useState } from 'react';
import { cryptography, transactions } from '@liskhq/lisk-client';
import * as api from './api.js';
import send from'./media/send.png';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import Tooltip from '@mui/material/Tooltip';




const Transfer = () => {
    const [state, updateState] = useState({
        address: '',
        amount: '',
        transaction: '',
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
        const address = cryptography.getAddressFromBase32Address(state.address);
        const tx = await client.transaction.create({
            moduleID: 2,
            assetID: 0,
            fee: BigInt(1000000),
            asset: {
                amount: BigInt(transactions.convertLSKToBeddows(state.amount)),
                recipientAddress: address,
                data: '',
            },
        }, sessionStorage.getItem('Passphrase')); 
        let res;
        try {
            res = await client.transaction.send(tx);
        } catch (error) {
            res = error;
        }

        updateState({
            transaction: client.transaction.toJSON(tx),
            address: '',
            amount: '',
           
        });
    };
    const reci = `Enter here recipient address who you want to send token.
`;
    const amou = `Enter here amount what you want to send.
`;

    return (
        <div>
            <h2>Transfer</h2>
            <p>Send tokens from one account to another.</p>
            <form onSubmit={handleSubmit}>
                <label>
                        <Tooltip title={reci}>
                        <input type="text" id="address" name="address" onChange={handleChange} value={state.address} placeholder="recipient address..."/> 
                        </Tooltip>
                </label><br></br><br></br>
        
                <label>
                         <Tooltip title={amou}>
                        <input type="text" id="amount" name="amount" onChange={handleChange} value={state.amount} placeholder="amount..."/> 
                        </Tooltip>
                </label><br></br><br></br>
                
               
            </form>
            {!state.transaction ? (
                <div>
                <Button variant="contained" onClick={handleSubmit} color="success" endIcon={<SendIcon />}>
                    Send
                </Button>
                </div>
            ):(
                <div>
                
                    Transaction  Sent.
                
                </div>
            )}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}>
            <img  src={send} style={{
                            width: "50%",
                            
                        }}/>
            </div>
        </div>
    );
}
export default Transfer;

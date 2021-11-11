import React, { useState } from 'react';
import { cryptography, transactions } from '@liskhq/lisk-client';
import * as api from './api.js';
import send from'./media/send.png';
import Transf from'./media/Transfer.png';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
    Divider,
  } from '@mui/material';



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
        try {
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
    } catch(e) {
        alert("Incorrect address");
      }
    };

    const acc = JSON.parse(sessionStorage.getItem('Account'));

    const reci = `Enter here recipient address who you want to send token.
`;
    const amou = `Enter here amount what you want to send.
`;
    const err = `You trying send more than you have.
`;
   

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left"
                }}>
                        <img  src={Transf} style={{
                        minWidth: "200px",
                        maxWidth: "300px",
                        }}/>   
                </div>
                <Divider />
                <Divider />
             <Typography 
         
                    color="textSecondary"
                    variant="body3"
                >
            <p>Send tokens from one account to another.</p>
            </Typography>

            <form onSubmit={handleSubmit}>
                <label>
                        <Tooltip title={reci}>
                        <input type="text" id="address" name="address" onChange={handleChange} value={state.address} placeholder="recipient address..."/> 
                        </Tooltip>     
                </label><br></br><br></br>
        
                <label>
                {state.amount > acc.token.balance/100000000 ?(
                <Alert variant="outlined" severity="error" title={amou} >

                        <input type="text" id="amount" name="amount" onChange={handleChange} value={state.amount} placeholder="amount..."/> {err}
                </Alert>
                ):(<Tooltip title={amou}>
                    
                <input type="text" id="amount" name="amount" onChange={handleChange} value={state.amount} placeholder="amount..."/>
                </Tooltip>
                )}
                </label><br></br><br></br>
                
               
            </form>
            {!state.transaction ? (

                <div>
                 {state.amount <= acc.token.balance/100000000 && state.amount > 0 && state.address ? (
                <Button variant="contained" onClick={handleSubmit} color="success" endIcon={<SendIcon />}>
                    Send
                </Button>
                ):(<Button variant="contained"  color="error" endIcon={<SendIcon />}>
                Send
                </Button>
                )}
                </div>

            ):(
                <div>
                
                <Alert variant="outlined" severity="success" >
                        Transaction Sent.
                </Alert>
                
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

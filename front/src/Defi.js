import React, { useState } from 'react';
import { cryptography, transactions } from '@liskhq/lisk-client';
import * as api from './api.js';
import sendpiggy from'./media/sendpiggy.png';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import SendPiggy from'./media/Send Piggy.png';
import Typography from '@mui/material/Typography';
import {
    Divider,
  } from '@mui/material';




const Defi = () => {
    const [state, updateState] = useState({
        address: '',
        amount: '',
        block:'',
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
            moduleID: 1000,
            assetID: 0,
            fee: BigInt(1000000),
            asset: {
                amount: BigInt(transactions.convertLSKToBeddows(state.amount)),
                recipientAddress: address,
                blockedTime: parseInt(state.block),
            },
        }, pass); 
        let res;
        try {
            res = await client.transaction.send(tx);
        } catch (error) {
            
        }

        updateState({
            transaction: client.transaction.toJSON(tx),
            address: '',
            amount: '',
            block: ''
        });
    } catch(e) {
        alert("Incorrect address");
      }
    };

    const acc = JSON.parse(sessionStorage.getItem('Account'));

    const pass = (sessionStorage.getItem('Passphrase'));

    const reci = `Paste your address here or the recipient's address if you want to block tokens.
`;
    const amou = `Enter here amount what you want to send.
`;
    const err = `You trying send more than you have.
`;
    const warn = `You want to block your tokens for more than a year. Please be careful you can't undo this.
`;
    const bloc = `Specify the lock time of your PIG tokens (in blocks). You can also lock PIG tokens for someone else by providing their address above, only if the recipient doesn't have anything in the piggybank yet. 1 block = 10sec. 1 day ~ 8640 blocks.
`;  

var time = state.block*10;
var seconds = parseInt(time, 10);

    var days = Math.floor(seconds / (3600*24));
    seconds  -= days*3600*24;
    var hrs   = Math.floor(seconds / 3600);
    seconds  -= hrs*3600;
    var mnts = Math.floor(seconds / 60);
    seconds  -= mnts*60;


    return (
        <div>
             <div style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left"
                }}>
                        <img  src={SendPiggy} style={{
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
            <p>Send tokens to the PiggyBank you want.</p>
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

                <label>
                {state.block > 3153600 ?(
               <Alert variant="outlined" severity="warning"
                title={bloc} >
                         <input type="text" id="block" name="block" onChange={handleChange} value={state.block} placeholder="amount of block..."/> {warn}
                </Alert>
                ):(
                <Tooltip title={bloc} >
                        <input type="text" id="block" name="block" onChange={handleChange} value={state.block} placeholder="amount of block..."/> 
                </Tooltip>
                )}
                <Typography 
         
                     color="textSecondary"
                     variant="body3"
                 >
                <p>Estimate time to unlock:  {days+" days, "+hrs+" Hrs, "+mnts+" Minutes, "+seconds+" Seconds"}</p>
                </Typography>
                </label><br></br>
                
            </form>

                {!state.transaction ? (

                <div>
                {state.amount <= acc.token.balance/100000000 && state.amount > 0 && state.address && state.block ? (
                <Button variant="contained" onClick={handleSubmit} color="success" endIcon={<SendIcon />}>
                    Send
                </Button>
                ):(
                <Button variant="contained"  color="error" endIcon={<SendIcon />}>
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
            <img  src={sendpiggy} style={{
                            width: "50%",
                            
                        }}/>
            </div>
        </div>
    );
}
export default Defi;

import React, { useState } from 'react';
import { cryptography, transactions } from '@liskhq/lisk-client';
import * as api from './api.js';
import sendpiggy from'./media/sendpiggy.png';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';




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
    };

    const pass = (sessionStorage.getItem('Passphrase'));

    const reci = `Paste your address here or the recipient's address if you want to block tokens.
`;
    const amou = `Enter here amount what you want to send.
`;
    const bloc = `Specify the lock time of your PIG tokens (in blocks). You can also lock PIG tokens for someone else by providing their address above, only if the recipient doesn't have anything in the piggybank yet. 1 block = 10sec. 1 day ~ 8640 blocks.
`;  

    return (
        <div>
            <h2>Send Piggy</h2>
            <p>Send tokens to the PiggyBank you want.</p>
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
                <label>
                <Tooltip title={bloc}>
                        <input type="text" id="block" name="block" onChange={handleChange} value={state.block} placeholder="amount of block..."/> 
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
            <img  src={sendpiggy} style={{
                            width: "50%",
                            
                        }}/>
            </div>
        </div>
    );
}
export default Defi;

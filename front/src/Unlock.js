import React, { useState, useEffect } from 'react';
import { cryptography, } from '@liskhq/lisk-client';
import * as api from './api.js';
import unlock from'./media/unlock.png';
import {  nodeInfoContextDefaultValue } from './context';
import Button from '@mui/material/Button';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CustomButton from '@mui/material/Button';



const Unlock = () => {
    const [state, updateState] = useState({
        address: '',
        passphrase: '',
        transaction: false
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const client = await api.getClient();
        const add = (sessionStorage.getItem('Address'));
        const address = cryptography.getAddressFromBase32Address(add);
        const tx = await client.transaction.create({
            moduleID: 1000,
            assetID: 1,
            fee: BigInt(1000000),
            asset: {
                recipientAddress: address,
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
            passphrase: '',
        });
    };

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
      setInterval(updateHeight, 1000);
    }
    fetchData();
  }, []);

  useEffect(() => {

if (acc.defi.end == 0){
    updateState({
        transaction: false,
    });
}else{
     if (acc.defi.end <= nodeInfoState.height)
        {
        updateState({
            transaction: true,
        });
        } else 
        {
            updateState({
                transaction: false,
            });}}
  });



    const acc = JSON.parse(sessionStorage.getItem('Account'));
    

    return (
       
        <div>
            
            <h2>Unlock</h2>
            <p>Liquidate your PiggyBank.</p>
           
            {state.transaction ? (
                <div>
                <Button variant="contained" onClick={handleSubmit} color="success" endIcon={<LockOpenIcon />}>
                    Unlock
                    
                </Button>
                </div>
            ):(
                <div>
                
                <CustomButton disabled>Can't unlock</CustomButton>
                
                </div>
            )}
          
                <div>
                    <p>You have {acc.defi.locked/100000000} PIG ready to unlock at block: {acc.defi.end}</p>
                    <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}>
                    <img  src={unlock} style={{
                    width: "80%",
                    }}/>
        </div>
                </div>
            
        </div>
        
    );
}
export default Unlock;

import React, { useState, useEffect } from 'react';
import { cryptography, } from '@liskhq/lisk-client';
import * as api from './api.js';
import unlock from'./media/unlock.png';
import Unloc from'./media/Unloc.png';
import {  nodeInfoContextDefaultValue } from './context';
import Button from '@mui/material/Button';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CustomButton from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';




const Unlock = () => {
    const [state, updateState] = useState({
        address: '',
        passphrase: '',
        transaction: 0,
        click: false
    });

    const acc = JSON.parse(sessionStorage.getItem('Account'));

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
            click: true
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
    
        state.transaction = 0
        state.click = false

}else{
     if (acc.defi.end <= nodeInfoState.height)
        {
            state.transaction = 1
        } else 
        {
            state.transaction = 0
            }}     
  });




    var time = ((acc.defi.end - nodeInfoState.height)*10);
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
                        <img  src={Unloc} style={{
                        minWidth: "200px",
                        maxWidth: "200px",
                        }}/>   
                </div>
            <p>Liquidate your PiggyBank.</p>
            <p>You have {acc.defi.locked/100000000} PIG ready to unlock at block: {acc.defi.end}</p>
            {state.transaction ? (
                <div>
                <p>Click unlock and wait few seconds.</p>
                <Button variant="contained" onClick={handleSubmit} color="success" endIcon={<LockOpenIcon />}>
                 Unlock 
                </Button>
                </div>
            ):(
                <div>
                {acc.defi.end ? (
                <p>Estimate time to unlock:  {days+" days, "+hrs+" Hrs, "+mnts+" Minutes, "+seconds+" Seconds"}</p>
                ):("")
                }
                <CustomButton disabled>Can't unlock</CustomButton>
                </div>
            )}
            <br></br>
            {state.click ? (
                
                <LinearProgress />
            ):(
                ""
            )}

                <div>
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

import React from 'react';
import Typography from '@mui/material/Typography';
import piggy from'./media/piggy.png';
import Account from'./media/Account.png';
import {
  CardHeader,
  Divider,
} from '@mui/material';




const Home =  () => {
  
    const acc = JSON.parse(sessionStorage.getItem('Account'));
    const add = sessionStorage.getItem('Address');

    
    return (

      <div>
        <div style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left"
                }}>
                        <img  src={Account} style={{
                        minWidth: "200px",
                        maxWidth: "250px",
                        }}/>   
                </div>
                <Divider />
                <Divider />
         <Typography sx={{
            marginTop: 2,
            
          }}>
          <div>
          <CardHeader
          subheader={add}
          title="Address:"
        />
        <CardHeader
          subheader={acc.address}
          title="Binary Address::"
        />
        <CardHeader
          subheader={acc.token.balance/100000000 + " PIG"} 
          title="Balance:"
        />
        <CardHeader
          subheader={acc.defi.locked/100000000 + " PIG"} 
          title="PiggyBank balance:"
        />
          </div>
          
        </Typography>
        
        <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}>
        <img  src={piggy} style={{
                            width: "40%",
                        }}/>
        </div>
      </div>
  )}
export default Home;


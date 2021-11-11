import React from 'react';
import Typography from '@mui/material/Typography';
import lisk from'./media/lisk.png';
import {
  Divider,
} from '@mui/material';


const Main =  () => {

    return (
    <div>                                 
        
        <Typography 
         
         color="textPrimary"
         variant="body3"
            
            sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}>
            <h2>Welcome in PiggyBank.</h2>

          </Typography>
          <Divider />
          <Divider />
         <Typography 
         
         color="textSecondary"
         variant="body3"
            
            sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}>
            <p>In this project you can send token to your piggy bank.</p>
            <p>You can also send blocked token to someone piggy bank.</p>
            <p>Unlock is possible after reach block height.</p>
            <p>Only account owner can unlock token.</p>
            <p>Block token for 1000 blocks or more and get 5% bonus. </p>
            <p>(This option will be change in future for growing. More block - more reward.) </p>

          </Typography>
          <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}>
        <img  src={lisk} style={{
                            width: "40%",
                        }}/>
        </div>
    </div>
    );
}
export default Main;
import React from 'react';
import Typography from '@mui/material/Typography';
import lisk from'./media/lisk.png';

const Main =  () => {

    return (
    <div>                                 
        
         <Typography sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}>
            <h3>Welcome in PiggyBank.</h3>
            <p>In this project you can send token to your piggy bank.</p>
            <p>You can also send blocked token to someone piggy bank.</p>
            <p>Unlock is possible after reach block height.</p>
            <p>Only account owner can unlock token.</p>
            <p>Block token for 10 blocks or more and get 5% bonus.</p>

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
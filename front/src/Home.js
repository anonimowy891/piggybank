import React from 'react';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import piggy from'./media/piggy.png';
import Account from'./media/Account.png';




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
        <Typography sx={{
            marginTop: 2,
            
          }}>
        {!acc ? (
          <div>
            <br></br>
          <LinearProgress />
          <pre style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }} >Wait a sec :D</pre>  
          <LinearProgress /><br></br>
          </div>
        ) : (
          <div>
          Address: {add}<br></br><br></br>
          Binary Address: {acc.address}<br></br><br></br>
          Balance: {acc.token.balance/100000000} PIG<br></br><br></br>
          PiggyBank balance: {acc.defi.locked/100000000} PIG<br></br>  <br></br>
          </div>
        )}
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


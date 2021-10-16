import React from 'react';
import Typography from '@mui/material/Typography';
import piggy from'./media/piggy.png';



const Home =  () => {
  
    const acc = JSON.parse(sessionStorage.getItem('Account'));
    const add = sessionStorage.getItem('Address');

    
    return (

      <div>
        <h2>Account </h2>
        <Typography sx={{
            marginTop: 2,
            
          }}>
        {!acc ? (
          <div>
            <br></br>
          <pre>Wait a sec :D</pre>  
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


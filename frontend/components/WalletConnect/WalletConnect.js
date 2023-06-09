import React, { useContext, useEffect } from "react";
import classes from './WalletConnect.module.css'
import { WalletContext } from "../../context/wallet";


export default function WalletConnect() {
   

    const context = useContext(WalletContext);
    const { connectWallet, connButton, walletAddress, getCurrentWalletConnected, addWalletListener, requestAccount } = context;

    useEffect(()=>{
       
        getCurrentWalletConnected();
        addWalletListener();
    }, [walletAddress])

   

    const connect = () => {
        connectWallet();
    }


    return (
        <div className={classes.button }>
            <button className={classes.button} style={{backgroundColor: `${walletAddress? '#af27af' : 'red'}`,}} onClick={connect}>{connButton}</button>
            
        </div>
    )
}

import { ethers } from 'ethers';
import React, { createContext, useState } from 'react'
import NFTcontract from '../ethereum/contractabi';

export const WalletContext = createContext();

const Wallet = (props) => {

    const [walletAddress, setWalletAddress] = useState();
    const [signer, setSigner] = useState();
    const [nftContract, setNftContract] = useState("");
    const [connButton, setConnButton] = useState("Connect Wallet")
    const [loader, setLoader] = useState(true);



    const requestAccount = async () => {
       
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                setWalletAddress(accounts[0]);
                
                const newbtn = await accounts[0]
                setConnButton(await (newbtn.slice(0, 4) + ".." + newbtn.slice(38)));
            } catch (error) {
                console.log(error);
            }
        }
        else {
            alert("Install metamask first...")
        }
    }

    const connectWallet = async () => {
        try {
            await requestAccount();
        if (typeof window.ethereum !== 'undefined') {
          


            const provider = new ethers.providers.Web3Provider(window.ethereum)
           
            const sign =  provider.getSigner();
            setSigner(sign);
          
            const contractInst = await NFTcontract(sign)
            setNftContract(contractInst);
           
            const number = await contractInst.NumberOfProperty();
            
            console.log(number);
            
        }
        } catch (error) {
            console.log(error);
        }
        
    }

    const getCurrentWalletConnected = async () => {
        if (window.ethereum) {
        await connectWallet();
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            try {
           
                /* Get Provider */
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                /* Get accounts */ // fetching already connected accounts 
                const accounts = await provider.send("eth_accounts", []);
                if (accounts.length > 0) {
                    /* Get signer  */
                    const sign = await provider.getSigner()
                    setSigner(sign);
                    
                   
                    /*set active wallet address */
                    setWalletAddress(accounts[0]);
                   

                } else {
                    console.log("Connect to MetaMask using the Connect Wallet button");
                }
            } catch (err) {
                console.error(err.message);
            }
        } else {
            /* MetaMask is not installed */
            console.log("Please install MetaMask");
        }
    }else {
        /* MetaMask is not installed */
        alert("Please install MetaMask")
        console.log("Please install MetaMask");
    }
    };

    // to load changed accounts or reflect updated accounts
    const addWalletListener = async () => {
        if (window.ethereum) {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            window.ethereum.on("accountsChanged", (accounts) => {
                setWalletAddress(accounts[0]);
               
            });
        } else {
            /* MetaMask is not installed */
            setWalletAddress("");
            console.log("Please install MetaMask");
        }
    }else {
        /* MetaMask is not installed */
        console.log("Please install MetaMask");
    }
    };


    return (
        <div>
            <WalletContext.Provider value={{ connectWallet, connButton, walletAddress, nftContract, getCurrentWalletConnected, addWalletListener, signer,  requestAccount, loader, setLoader }}>
     
                {props.children}
            </WalletContext.Provider>


        </div>
    )
}

export default Wallet

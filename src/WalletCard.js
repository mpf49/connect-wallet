import React, {useState} from 'react'
import './walletStyle.css';



const WallerCard = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connButtonText, setConnectText] = useState('Connect Wallet');
    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]);
            })
        } else {
            setErrorMessage('Install MetaMask');
        }
    }
    const accountChangedHandler = (newAccount) => {
           setDefaultAccount(newAccount);
    }
    
    return (
        <div className='walletCard'>
            <h4 className='headWallet'> {"MetaMask Wallet"}
         </h4>
         <button className='MetaBtn' onClick={connectWalletHandler}>{connButtonText}</button>
         <div className='accountDisplay'>
         <h3>Address: {defaultAccount}</h3>
         </div>
         {errorMessage}
        </div>
    )
    }
 
export default WallerCard;
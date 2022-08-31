import React, {useState} from 'react'
import {ethers} from 'ethers'
import './walletStyle.css'

const WalletCard = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const targetNetworkId = '0x3';


	const checkNetwork = async () => {
		if (window.ethereum) {
		  const currentChainId = await window.ethereum.request({
			method: 'eth_chainId',
			if (currentChainId = targetNetworkId) {return true;}
		})
		  }}


	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}


	
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		
		window.location.reload();
	}


	
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);
	
	return (
		<div className='walletCard'>
		<h4> {"Metamask Wallet"} </h4>
			<button className='MetaBtn' onClick={connectWalletHandler}>{connButtonText}</button>
			<div className='accountDisplay'>
				<h5>Address: {defaultAccount}</h5>
			</div>
			<div className='balanceDisplay'>
				<h5>Balance: {userBalance}</h5>
			</div>
			{errorMessage}
		</div>
	);
}

export default WalletCard;
import { useEffect, useState, useCallback } from 'react';
import { provider as ProviderType } from 'web3-core';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { ETH_SENDER_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ADDRESS } from './constants';
import registryAbi from './contracts/registry.json';
import senderAbi from './contracts/ethsender.json';

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: "8043bb2cf99347b1bfadfb233c5325c0"
        }
    }
}

let web3Modal: any;
if (typeof window !== 'undefined') {
    web3Modal = new Web3Modal({
        cacheProvider: false,
        disableInjectedProvider: false,
        providerOptions,
    });
}

export const useConnector = () => {
    const [provider, setProvider] = useState<ProviderType | null>(null);
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [isRopsten, setIsRopsten] = useState(false);
    const [registryContract, setRegistryContract] = useState<Contract | null>(null); 
    const [senderContract, setSenderContract] = useState<Contract | null>(null);
    const [active, setActive] = useState(false);
  
    const connect = useCallback(async () => {
      const provider = await web3Modal.connect();
      console.log("provider", provider)
      provider
      .on('connect', console.log)
      .on('chainChanged', (chainId: number) => {
        setIsRopsten(chainId.toString() === '0x3');
      });
      setProvider(provider);
      const web3 = new Web3(provider);
      setActive(true);
      setWeb3(web3);
      setRegistryContract(new web3.eth.Contract((registryAbi as unknown) as AbiItem, REGISTRY_CONTRACT_ADDRESS));
      setSenderContract(new web3.eth.Contract((senderAbi as unknown) as AbiItem, ETH_SENDER_CONTRACT_ADDRESS));
    }, [setProvider, setWeb3]);
  
    const disconnect = useCallback(async () => {
      web3Modal.clearCachedProvider();
      setProvider(null);
      setIsRopsten(false);
      setActive(false);
    }, [setProvider]);
  
    useEffect(() => {
      async function init() {
        if (web3) {
          const chainId = await web3.eth.net.getId();
          setIsRopsten(chainId === 3);
        }
      }
      init();
    }, [web3, setIsRopsten]);
  
    return { active, connect, disconnect, web3, isRopsten, registryContract, senderContract };
  };
  
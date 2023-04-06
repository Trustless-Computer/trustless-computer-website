import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from '@/state/hooks';
import { resetUser, updateEVMWallet, updateSelectedWallet, updateTaprootWallet } from '@/state/user/reducer';
import { getConnection } from '@/connection';
import { generateBitcoinTaprootKey } from '@/utils/derive-key';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';

export interface IWalletContext {
  onDisconnect: () => void;
  onConnect: () => Promise<string | null>;
  generateBitcoinKey: () => Promise<string | null>;
}

const initialValue: IWalletContext = {
  onDisconnect: () => undefined,
  onConnect: () => new Promise<null>(r => r(null)),
  generateBitcoinKey: () => new Promise<null>(r => r(null)),
};

export const WalletContext = React.createContext<IWalletContext>(initialValue);

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const { connector, provider, account } = useWeb3React();
  const dispatch = useAppDispatch();
  const user = useSelector(getUserSelector);

  const disconnect = React.useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate();
    }
    connector.resetState();
    dispatch(resetUser());
  }, [connector, dispatch]);

  const connect = React.useCallback(async () => {
    const connection = getConnection(connector);
    if (!connection) {
      throw new Error('Get connection error.');
    }
    await connection.connector.activate();
    const addresses = await connector.provider?.request({
      method: 'eth_accounts',
    });
    if (addresses && Array.isArray(addresses)) {
      const evmWalletAddress = addresses[0];
      dispatch(updateEVMWallet(evmWalletAddress));
      dispatch(updateSelectedWallet({ wallet: connection.type }));
      return evmWalletAddress;
    }
    return null;
  }, [dispatch, connector]);

  const generateBitcoinKey = React.useCallback(async () => {
    const addresses = await connector.provider?.request({
      method: 'eth_accounts',
    });
    if (addresses && Array.isArray(addresses)) {
      const evmWalletAddress = addresses[0];
      const { address: taprootAddress } = await generateBitcoinTaprootKey(evmWalletAddress);
      if (taprootAddress) {
        dispatch(updateTaprootWallet(taprootAddress));
        return taprootAddress;
      }
    }
    return null;
  }, [connector]);

  useEffect(() => {
    if (user?.walletAddress && !user.walletAddressBtcTaproot) {
      generateBitcoinKey();
    }
  }, [user, generateBitcoinKey]);

  const contextValues = useMemo((): IWalletContext => {
    return {
      onDisconnect: disconnect,
      onConnect: connect,
      generateBitcoinKey,
    };
  }, [disconnect, connect, generateBitcoinKey]);

  return <WalletContext.Provider value={contextValues}>{children}</WalletContext.Provider>;
};

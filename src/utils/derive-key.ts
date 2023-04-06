import { ethers } from 'ethers';
import { Buffer } from 'buffer';
import * as bitcoin from 'bitcoinjs-lib';
import BIP32Factory from 'bip32';
import ecc from '@bitcoinerlab/secp256k1';
import bitcoinStorage from '@/utils/bitcoin-storage';
import { clearAccessTokenStorage } from './auth-storage';
import { resetUser } from '@/state/user/reducer';
import store from '@/state';
import { ROUTE_PATH } from '@/constants/route-path';

bitcoin.initEccLib(ecc);
const bip32 = BIP32Factory(ecc);

const toXOnly = (pubKey: Buffer) => (pubKey.length === 32 ? pubKey : pubKey.slice(1, 33));

const DEFAULT_PATH = "m/86'/0'/0'/0/0";
const SIGN_MESSAGE =
  'Sign this message to generate your Bitcoin Taproot key. This key will be used for your Trustless Computer transactions.';
const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

export const genMetamaskMessageForSign = (payload: {
  taprootAddress: string;
  segwitAddress: string;
  nonceMessage: string;
}) => {
  return `GM.\n\nPlease sign this message to confirm your Trustless Computer wallet addresses generated by your Ethereum address.\n\nTaproot address:\n${payload.taprootAddress}\n\nSegwit address:\n${payload.segwitAddress}\n\nNonce:\n${payload.nonceMessage}\n\nThe Trustless Computer Core Team`;
};

const getBitcoinKeySignContent = (message: string): Buffer => {
  return Buffer.from(message);
};

export interface IError {
  message: string;
  code: number;
}

const getError = (err: unknown): IError => {
  const randomCode = Math.floor(Math.random() * 100);
  let _err: IError;
  if (typeof err === 'string') {
    _err = {
      message: err,
      code: randomCode,
    };
  } else if (!!err && typeof err === 'object' && 'message' in err && typeof Object(err).message === 'string') {
    const errCode =
      'code' in err && (typeof Object(err).code === 'number' || typeof Object(err).code === 'string')
        ? Object(err).code
        : randomCode;
    _err = {
      message: Object(err).message,
      code: Number(errCode),
    };
  } else {
    _err = {
      message: JSON.stringify(err || DEFAULT_ERROR_MESSAGE),
      code: randomCode,
    };
  }
  return _err;
};

const isAuthMetamaskError = async (error: unknown, profileAddress: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
  let currentAccount;
  const accounts = await provider.send('eth_requestAccounts', []);
  if (!!accounts && !!accounts.length) {
    currentAccount = accounts[0];
    // force re-sign in
    if (!!error && !!currentAccount && currentAccount !== profileAddress) {
      const _err = getError(error);
      return _err.code === 4100;
    }
  }
  return false;
};

export const generateBitcoinTaprootKey = async (address: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
    const toSign = '0x' + getBitcoinKeySignContent(SIGN_MESSAGE).toString('hex');
    const signature = await provider.send('personal_sign', [toSign, address.toString()]);
    const seed = ethers.utils.arrayify(ethers.utils.keccak256(ethers.utils.arrayify(signature)));
    const root = bip32.fromSeed(Buffer.from(seed));

    // Taproot
    const taprootChild = root.derivePath(DEFAULT_PATH);
    const { address: taprootAddress } = bitcoin.payments.p2tr({
      internalPubkey: toXOnly(taprootChild.publicKey),
    });

    if (taprootAddress) {
      bitcoinStorage.setUserTaprootAddress(address, taprootAddress);
    }

    return {
      root,
      taprootChild,
      address: taprootAddress,
      signature,
    };
  } catch (error) {
    const isMetamaskAuthError = await isAuthMetamaskError(error, address);
    if (isMetamaskAuthError && !!store && !!store.dispatch) {
      clearAccessTokenStorage();
      store.dispatch(resetUser());
      location.replace(ROUTE_PATH.HOME);
    }
    throw error;
  }
};

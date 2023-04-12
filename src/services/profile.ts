import { IProfileResponse } from '@/interfaces/api/profile';
import { apiClient } from '.';
import { camelCaseKeys } from '@/utils/helpers';
import { IPagingParams } from '@/interfaces/api/query';

const API_PATH = '/profile';

export const getCurrentProfile = async (): Promise<IProfileResponse> => {
  try {
    const res = await apiClient.get(`${API_PATH}/me`);
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    console.log(err);
    throw Error('Profile not found');
  }
};

export const updateStatusTransaction = async ({ txHash }: { txHash: string[] }): Promise<any> => {
  try {
    const res = await apiClient.put(`${API_PATH}/histories/confirm`, { tx_hash: txHash });
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    console.log(err);
    throw Error('Fail to update status transaction');
  }
};

export const createTransactionHistory = async (payload: { dapp_type: string; tx_hash: string }): Promise<any> => {
  try {
    const res = await apiClient.post(`${API_PATH}/histories`, payload);
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    console.log(err);
    throw Error('Fail to update status transaction');
  }
};

export const getTransactionsByWallet = async ({
  walletAddress,
  limit = 200,
  page = 1,
}: { walletAddress: string } & IPagingParams): Promise<any> => {
  try {
    const res = await apiClient.get(`${API_PATH}/wallet/${walletAddress}/histories?limit=${limit}&page=${page}`);
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    console.log(err);
    throw Error('Profile not found');
  }
};

export const getCollectionsByItemsOwned = async ({
  walletAddress,
  limit,
  page,
}: { walletAddress: string } & IPagingParams): Promise<any> => {
  try {
    const res = await apiClient.get(`${API_PATH}/wallet/${walletAddress}/collections`);
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    console.log(err);
    throw Error('Profile not found');
  }
};

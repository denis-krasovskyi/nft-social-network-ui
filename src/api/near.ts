import { AxiosResponse } from 'axios';

import { NearSignature } from 'services/near';

import api from './index';

export const processSignatureRequest = (data: {
  sign: NearSignature;
  accId: string;
}): Promise<AxiosResponse<string>> =>
  api.post('/auth/near/login', {
    accountId: data.accId,
    publicKey: data.sign.publicKey,
    signature: data.sign.signature,
  });

import * as nearAPI from 'near-api-js';
import buffer from 'buffer';
import type { History } from 'history';

import {
  Near,
  keyStores,
  WalletConnection,
  ConnectedWalletAccount,
} from 'near-api-js';
import { NearConfig } from 'near-api-js/lib/near';

const { connect } = nearAPI;

const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const config = {
  networkId: 'testnet',
  keyStore, // optional if not signing transactions
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  headers: {},
};

export type NearSignature = {
  signature: string;
  publicKey: string;
};

class NearService {
  constructor(nearConfig: NearConfig) {
    this.nearConfig = nearConfig;

    this.init();
  }

  near: Near;

  wallet: WalletConnection;

  nearConfig: NearConfig;

  init() {
    return connect(this.nearConfig).then((nearInstance) => {
      this.near = nearInstance;

      this.wallet = new WalletConnection(nearInstance, 'my-app');
    });
  }

  getWallet = (): WalletConnection => this.wallet;

  getUserAccount = (): ConnectedWalletAccount => this.wallet.account();

  getUserAccountId = (): string => this.wallet.getAccountId();

  checkIsLoggedIn = () => this.wallet && this.wallet.isSignedIn();

  getSignature = async (): Promise<NearSignature | null> => {
    if (this.wallet.isSignedIn()) {
      const keyPair = await keyStore.getKey(
        'testnet',
        this.wallet.getAccountId(),
      );
      const signature = await this.sign(keyPair);
      return { signature, publicKey: keyPair.getPublicKey().toString() };
    }
    return null;
  };

  login = (history: History): Promise<null> => {
    if (!this.wallet.isSignedIn()) {
      this.wallet.requestSignIn(
        'example-contract.testnet', // contract requesting access
        'Example App',
        // 'http://10.1.1.63:3000/#/sign-in',
        // 'http://10.1.1.63:3000',
      );
      return null;
    }
    history.push('/cabinet/account');

    return null;
  };

  logOut = () => this.wallet.signOut();

  getNear = (): Near => this.near;

  sign = async (keyPair): Promise<string> => {
    const msg = buffer.Buffer.from(keyPair.getPublicKey().toString());

    const { signature } = keyPair.sign(msg);
    return buffer.Buffer.from(signature).toString('base64');
  };
}

const service = new NearService(config);

export default service;

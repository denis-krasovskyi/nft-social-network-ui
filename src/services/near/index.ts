import * as nearAPI from 'near-api-js';
import buffer from 'buffer';
import {
  Near,
  keyStores,
  WalletConnection,
  ConnectedWalletAccount,
} from 'near-api-js';
import { NearConfig } from 'near-api-js/lib/near';

const { connect } = nearAPI;

const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const { ACCOUNT_ID } = process.env;

const config = {
  networkId: 'testnet',
  keyStore, // optional if not signing transactions
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  headers: {},
};

class NearService {
  constructor(nearConfig: NearConfig) {
    connect(nearConfig).then((nearInstance) => {
      this.near = nearInstance;
      this.wallet = new WalletConnection(nearInstance, 'my-app');
    });
  }

  near: Near;

  wallet: WalletConnection;

  getWallet = (): WalletConnection => {
    return this.wallet;
  };

  getUserAccount = (): ConnectedWalletAccount => {
    return this.wallet.account();
  };

  login = () => {
    if (this.wallet.isSignedIn()) {
      return null;
    }

    return this.wallet.requestSignIn(
      'example-contract.testnet', // contract requesting access
      'Example App',
    );
  };

  logOut = () => {
    return this.wallet.signOut();
  };

  getNear = (): Near => {
    return this.near;
  };

  verifySignature = async (): Promise<boolean> => {
    const keyPair = await keyStore.getKey(config.networkId, ACCOUNT_ID);
    const msg = buffer.Buffer.from(Date.now().toString());

    const { signature } = keyPair.sign(msg);

    const isValid = keyPair.verify(msg, signature);

    console.log('Signature Valid?:', isValid);

    return isValid;
  };
}

const service = new NearService(config);

export default service;

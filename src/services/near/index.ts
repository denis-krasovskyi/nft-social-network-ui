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
    connect(nearConfig).then((nearInstance) => {
      this.near = nearInstance;
      this.wallet = new WalletConnection(nearInstance, 'my-app');
    });
  }

  near: Near;

  wallet: WalletConnection;

  getWallet = (): WalletConnection => this.wallet;

  getUserAccount = (): ConnectedWalletAccount => this.wallet.account();

  getUserAccountId = (): string => this.wallet.getAccountId();

  checkIsLoggedIn = () => this.wallet.isSignedIn();

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

  login = async (): Promise<null> => {
    if (!this.wallet.isSignedIn()) {
      await this.wallet.requestSignIn(
        'example-contract.testnet', // contract requesting access
        'Example App',
        'http://localhost:3000/#/deep-link',
        'http://localhost:3000',
      );
      return null;
    }
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

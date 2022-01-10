import buffer from 'buffer';
import {
  Near,
  keyStores,
  WalletConnection,
  ConnectedWalletAccount,
  KeyPair,
  connect,
} from 'near-api-js';
import { NearConfig } from 'near-api-js/lib/near';

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

  async init() {
    this.near = await connect(this.nearConfig);
    this.wallet = new WalletConnection(this.near, 'my-app');
  }

  getWallet = (): WalletConnection => this.wallet;

  getUserAccount = (): ConnectedWalletAccount => this.wallet.account();

  getUserAccountId = (): string => this.wallet.getAccountId();

  checkIsLoggedIn = () => this.wallet?.isSignedIn();

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

  login = () => {
    this.wallet.requestSignIn(
      'example-contract.testnet', // contract requesting access
      'Example App',
      // 'http://10.1.1.63:3000/#/sign-in',
      // 'http://10.1.1.63:3000',
    );
  };

  logOut = () => this.wallet.signOut();

  getNear = (): Near => this.near;

  sign = async (keyPair: KeyPair): Promise<string> => {
    const msg = buffer.Buffer.from(keyPair.getPublicKey().toString());

    const { signature } = keyPair.sign(msg);
    return buffer.Buffer.from(signature).toString('base64');
  };

  buildLoginString(successUrl: string, failureUrl?: string): string {
    const accessKey = KeyPair.fromRandom('ed25519');

    const query = new URLSearchParams({
      success_url: successUrl,
      failure_url: failureUrl || successUrl,
      contract_id: 'example-contract.testnet', // TODO replace when the actual contract will be present
      public_key: accessKey.getPublicKey().toString(),
      methodNames: ['get_policy'].toString(),
      referrer: 'Singularity',
      title: 'Singularity',
    });

    return `${this.nearConfig.walletUrl}/login?${query.toString()}`;
  }
}

const service = new NearService(config);

export default service;

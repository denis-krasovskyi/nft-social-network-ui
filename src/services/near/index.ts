import buffer from 'buffer';
import { Near, keyStores, KeyPair, connect } from 'near-api-js';
import { NearConfig } from 'near-api-js/lib/near';

export const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const config = {
  networkId: process.env.REACT_APP_NETWORK_ID,
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

  nearConfig: NearConfig;

  async init() {
    this.near = await connect(this.nearConfig);
  }

  getUserAccount = (accountId: string) => {
    return this.near.account(accountId);
  };

  getUserAccountId = async () => {
    const accounts = await this.nearConfig.keyStore?.getAccounts(
      this.nearConfig.networkId,
    );

    return accounts?.[0];
  };

  getSignature = async (accId: string): Promise<NearSignature | null> => {
    const keyPair = await keyStore.getKey(this.nearConfig.networkId, accId);
    const signature = await this.sign(keyPair);
    return { signature, publicKey: keyPair.getPublicKey().toString() };
  };

  // login = () => {
  //   this.wallet.requestSignIn(
  //     'example-contract.testnet', // contract requesting access
  //     'Example App',
  //     // 'http://10.1.1.63:3000/#/sign-in',
  //     // 'http://10.1.1.63:3000',
  //   );
  // };

  // logOut = () => this.wallet.signOut();

  getNear = (): Near => this.near;

  sign = async (keyPair: KeyPair): Promise<string> => {
    const msg = buffer.Buffer.from(keyPair.getPublicKey().toString());

    const { signature } = keyPair.sign(msg);
    return buffer.Buffer.from(signature).toString('base64');
  };

  async intiLogin(
    successUrl: string,
    failureUrl?: string,
  ): Promise<{ loginUrl: string; accessKey: KeyPair }> {
    const accessKey = KeyPair.fromRandom('ed25519');
    const publicKey = accessKey.getPublicKey();

    const query = new URLSearchParams({
      success_url: successUrl,
      failure_url: failureUrl || successUrl,
      contract_id: 'example-contract.testnet', // TODO replace when the actual contract will be present
      public_key: publicKey.toString(),
      methodNames: ['get_policy'].toString(),
      referrer: 'Singularity',
      title: 'Singularity',
    });

    return {
      loginUrl: `${this.nearConfig.walletUrl}/login?${query.toString()}`,
      accessKey,
    };
  }
}

const service = new NearService(config);

export default service;

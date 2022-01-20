declare global {
  interface Window {
    cordova?: {
      // https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/
      InAppBrowser: {
        open(
          href: string,
          target: string,
          options: string,
        ): {
          addEventListener: (
            eventName: 'beforeload',
            cb: (params: { url: string }, load: (url: string) => void) => void,
          ) => void;
          close: () => void;
        };
      };
    };
    completeSignIn?: (accId: string) => void;
  }
}

export {};

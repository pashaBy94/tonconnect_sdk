import TonConnect from '@tonconnect/sdk';

export const connector = new TonConnect();
console.log(connector);

connector.restoreConnection();

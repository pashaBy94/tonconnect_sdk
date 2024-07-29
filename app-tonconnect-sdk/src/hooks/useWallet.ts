import { Wallet } from '@tonconnect/sdk';
import { useEffect, useState } from 'react';
import { connector } from '../api/connector/connector';

export function useWallet(): Wallet | null {
    const [wallet, setWallet] = useState<Wallet | null>(null);
    useEffect(() => {
        return connector.onStatusChange(setWallet);
    }, []);
    return wallet;
}

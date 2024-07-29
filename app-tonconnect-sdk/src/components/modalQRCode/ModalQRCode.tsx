import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react';
import { WalletInfoRemote } from '@tonconnect/sdk';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { connector } from '../../api/connector/connector';

export function ModalQRCode({
    isOpen,
    onClose,
    wallet,
}: {
    isOpen: boolean;
    onClose: () => void;
    wallet: WalletInfoRemote | null;
}) {
    const [connectedWallet, setConnectedWallet] = useState('');
    useEffect(() => {
        console.log(connectedWallet);
    }, [connectedWallet]);
    useEffect(() => {
        if (wallet)
            setConnectedWallet(connector.connect({ bridgeUrl: wallet.bridgeUrl, universalLink: wallet.universalLink }));
    }, [wallet]);

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>Connect to {wallet?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection={'column'}
                        gap={'20px'}
                    >
                        <QRCode size={320} value={connectedWallet} />
                        <Button w={'100%'} padding={'10px'} onClick={() => window.open(connectedWallet)}>
                            Open {wallet?.name}
                        </Button>
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </>
    );
}

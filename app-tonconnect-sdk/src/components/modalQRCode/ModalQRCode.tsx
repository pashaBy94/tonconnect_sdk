import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { WalletInfo } from '@tonconnect/sdk';
import { useEffect } from 'react';

export function ModalQRCode({ isOpen, onClose, wallet }: { isOpen: boolean; onClose: () => void; wallet: WalletInfo }) {
    useEffect(() => {}, []);

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>Connect to {wallet?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>HELLO</ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </>
    );
}

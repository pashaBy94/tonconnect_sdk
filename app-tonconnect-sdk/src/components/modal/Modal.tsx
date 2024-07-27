import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    List,
    ListItem,
    Image,
} from '@chakra-ui/react';
import { WalletInfo } from '@tonconnect/sdk';
import st from './Modal.module.css';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { connector } from '../../api/connector/connector';
export function ModalConnect({
    isOpen,
    onClose,
    onOpen,
}: {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}) {
    const [wallets, setWallets] = useState<WalletInfo[] | null>(null);
    useEffect(() => {
        connector.getWallets().then((wallet) => {
            if (wallet.length) setWallets(wallet);
        });
    }, []);
    return (
        <>
            <Button onClick={onOpen}>Connect wallet</Button>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>Connect wallet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <List className={st.list}>
                            {wallets?.map((wal) => {
                                console.log(wal);
                                return (
                                    <ListItem key={wal.name + wal.aboutUrl} className={st.item}>
                                        <h4>{wal.name}</h4>
                                        <h5>{wal.platforms}</h5>
                                        <Image src={wal.imageUrl} width={'20px'} height={'20px'} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Connect</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

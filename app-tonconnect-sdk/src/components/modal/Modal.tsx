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
    Box,
    useColorMode,
    Text,
} from '@chakra-ui/react';
import { isWalletInfoCurrentlyInjected, isWalletInfoRemote, WalletInfo } from '@tonconnect/sdk';
import st from './Modal.module.css';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { connector } from '../../api/connector/connector';
import { ModalQRCode } from '../modalQRCode/ModalQRCode';
import { createPortal } from 'react-dom';
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
    const [isQRCode, setQRCode] = useState(false);
    const close = () => setQRCode(false);
    const open = () => setQRCode(true);

    const { colorMode } = useColorMode();
    const onWalletClick = (wallet: WalletInfo) => {
        if (isWalletInfoRemote(wallet)) {
            // QR code
            open();
        }
        if (isWalletInfoCurrentlyInjected(wallet)) {
            return connector.connect({ jsBridgeKey: wallet.jsBridgeKey });
        }
        window.open(wallet.aboutUrl, '_blank');
    };

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
                        <List className={st.list} display={'grid'}>
                            {wallets?.map((wal) => {
                                console.log([...wal.platforms]);
                                return (
                                    <ListItem
                                        key={wal.name + wal.aboutUrl}
                                        className={st.item}
                                        padding={'5px'}
                                        backgroundColor={colorMode === 'light' ? 'rgb(226, 239, 245)' : '#4d5564'}
                                        boxShadow={'3px 3px 4px 0 rgb(172, 172, 172)'}
                                        borderRadius={'5px'}
                                        textAlign={'left'}
                                        display={'flex'}
                                        flexDirection={'column'}
                                        _hover={{
                                            backgroundColor: `${colorMode === 'light' ? '#bfcbd8' : '#4d5564'}`,
                                            boxShadow: '1px 1px 2px 0 rgb(172, 172, 172)',
                                        }}
                                        as={'button'}
                                        onClick={() => {
                                            onWalletClick(wal);
                                        }}
                                    >
                                        <Box display={'flex'} gap={'5px'}>
                                            <Image
                                                src={wal.imageUrl}
                                                width={'20px'}
                                                height={'20px'}
                                                borderRadius={'3px'}
                                            />
                                            <Text className={st.wallet_name} fontWeight={'bold'} fontSize={'0.8em'}>
                                                {wal.name}
                                            </Text>
                                        </Box>
                                        <Text className={st.wallet_text} padding={'5px'} fontSize={'smaller'}>
                                            {[
                                                ...wal.platforms.map((el, ind, arr) => {
                                                    return (
                                                        <span>
                                                            {el}
                                                            {ind === arr.length - 1 ? '' : ', '}
                                                        </span>
                                                    );
                                                }),
                                            ]}
                                        </Text>

                                        <ModalQRCode isOpen={isQRCode} onClose={close} wallet={wal} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
            {/* <ModalQRCode isOpen={isQRCode} onClose={close} /> */}
        </>
    );
}

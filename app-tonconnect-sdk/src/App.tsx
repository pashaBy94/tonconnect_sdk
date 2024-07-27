/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import { Box } from '@chakra-ui/react';
import { Content } from './components/content/Content';
import { Header } from './components/header/Header';
// eslint-disable-next-line import/no-unresolved
// import { ModalConnect } from './components/modal/Modal';

export default function App() {
    return (
        <Box p={'10px 40px'}>
            <Header />
            <Content />
            {/* <Footer /> */}
        </Box>
    );
}

import { Box, Button, useColorMode } from '@chakra-ui/react';
import st from './Header.module.css';
import { LinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

export function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    console.log(colorMode);

    return (
        <header className={st.head}>
            <LinkIcon position={'relative'} width={'30px'} height={'30px'} color="yellow.200"></LinkIcon>
            <Box>
                <Button onClick={toggleColorMode} padding={0} borderRadius={'50px'}>
                    {colorMode === 'dark' ? <SunIcon color={'yellow.200'} /> : <MoonIcon color={'gray.600'} />}
                </Button>
            </Box>
        </header>
    );
}

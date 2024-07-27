import { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { ModalConnect } from '../modal/Modal';

export function Content() {
    const [isOpen, setOpen] = useState(false);
    const close = () => setOpen(false);
    const open = () => setOpen(true);

    return (
        <>
            <ModalConnect isOpen={isOpen} onClose={close} onOpen={open} />
        </>
    );
}

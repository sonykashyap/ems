import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Dialog } from '@/components/ui/dialog';


type modalDialog = {
    isModalOpen: Boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>,
    children: ReactNode
}


const ModalDialog = ({isModalOpen, setIsModalOpen, children}: modalDialog) => {


    return(
        <>
             <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                {children}
            </Dialog>
        </>
    )
}


export default ModalDialog;
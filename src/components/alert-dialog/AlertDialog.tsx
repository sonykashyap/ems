import React, { Dispatch, SetStateAction } from 'react';
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger } from '@/components/ui/alert-dialog';

import { deleteUserById, getAllUsers } from '@/reducers/userReducer';
import { useDispatch } from 'react-redux';
import {toast} from 'sonner';

type alertDialog = {
    message: string,
    isOpen: Boolean,
    setOpenDialog: Dispatch<SetStateAction<boolean>>,
    userId: string | null
}

const AlertDialogComponent = ({message, isOpen, setOpenDialog, userId }: alertDialog) => {
    const dispatch = useDispatch();


    const deleteUser = () => {
        
        dispatch(deleteUserById(userId))
        .then(status =>{
            if(status.payload.status === 200){
                toast('User Deleted Successfuly', {
                    classNames: {
                        toast: "!bg-green-100",
                        title: "!text-green-500"
                    }
                });
                dispatch(getAllUsers());
                setOpenDialog(false);
            }
        })
        .catch(error=>{
            console.log(error);
        });
    }

    return(
        <>
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenDialog(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteUser}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default AlertDialogComponent;
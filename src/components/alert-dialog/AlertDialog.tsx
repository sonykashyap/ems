import React, { Dispatch, SetStateAction } from 'react';
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle } from '@/components/ui/alert-dialog';


import { useDispatch } from 'react-redux';

type alertDialog = {
    message: string,
    isOpen: boolean,
    setOpenDialog: Dispatch<SetStateAction<boolean>>,
    id: string | null,
    deleteMethod: Dispatch<SetStateAction<void>>,
}

const AlertDialogComponent = ({message, isOpen, setOpenDialog, id, deleteMethod }: alertDialog) => {
    const dispatch = useDispatch();


    const deleteHandler = () => {
        console.log("Delete method called");
        deleteMethod();
    }


    // const deleteUser = () => {
        
    //     dispatch(deleteUserById(id))
    //     .then(status =>{
    //         if(status.payload.status === 200){
    //             toast('User Deleted Successfully', {
    //                 classNames: {
    //                     toast: "!bg-green-100",
    //                     title: "!text-green-500"
    //                 }
    //             });
    //             dispatch(getAllUsers());
    //             setOpenDialog(false);
    //         }
    //     })
    //     .catch(error=>{
    //         console.log(error);
    //     });
    // }

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
                        <AlertDialogCancel onClick={() => setOpenDialog(false)} className='hover:bg-white hover:text-black'>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteHandler} className='text-white hover:bg-red-600 bg-red-500'>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default AlertDialogComponent;
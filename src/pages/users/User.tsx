import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/components/data-table/Datatable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, UserPlus } from "lucide-react";
import AlertDialogComponent from '@/components/alert-dialog/AlertDialog';
import {clearToast, deleteUserById, getAllUsers, LOGOUT} from '@/reducers/userReducer';
import AddUserModal from '@/components/add-user-modal/AddUserModal';
import { addUser, editUser } from '@/reducers/userReducer';
import {toast} from 'sonner';
import ContextMenu from '@/components/context-menu/ContextMenu';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks';

export type UsersData = {
  id: string
  email: number
  status: "pending" | "Active" | "deleted"
  name: string
}


const User = () =>{

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state: RootState) => state.userReducer.users);
  const error = useAppSelector((state: RootState)=> state.userReducer.error);
  const toastState = useAppSelector((state:RootState)=> state.userReducer.toast);
  const [openDialog, setOpenDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [lastAddedUserId, setLastAddedUserId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userEditData, setUserEditData] = useState<object | null>({});

  const columns: ColumnDef<UsersData>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
     {
      accessorKey: "roleId",
      header: "Role",
      cell: ({row})=>{
        const Role = row.original
        return (
          <span> {Role.roleId.name} </span>
        )
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell:  ({row}) => {
        const status = "Active" as string
        return (
          <span className={`text-white p-1 text-sm rounded-sm ${status === "Active" ? "bg-violet-400" : "bg-red-400"} `}> Active </span>
        )
      }
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const userData = row.original
  
        return (
          <ContextMenu action={userAction} data={userData} />
        )
      },
    },
  
  ]
  
  const userAction = (id : string, data: object | null, action: string) => {
    setId(id);
    if(action === "delete"){
      setOpenDialog(true);
    }else if(action == 'edit'){
      console.log("User to edit is ", data.name);
      setUserEditData(data);
      setIsEdit(true);
      setIsModalOpen(true);
    }
  }

const addNewUser = (values) => {
  try{
    dispatch(addUser(values)).unwrap();
    // toast(`User created successfully`, {
    //   classNames: {
    //     toast: "!bg-green-200",
    //     title: "font-bold !text-green-600",
    //   },
    // });
    // setLastAddedUserId(user.payload.data.user._id);
    setIsModalOpen(false);
  }catch(error){
    console.log(error);
    // toast(`Failed to add user`, {
    //   classNames: {
    //     toast: "!bg-red-200",
    //     title: "font-bold !text-red-600",
    //   },
    // });
  }
   setIsModalOpen(false);
}

const editUserhandler = (values) => {
  dispatch(editUser(values))
  .then(response=>{
    setIsModalOpen(false);
    if(response.payload.status === 200){
      dispatch(getAllUsers());
      toast(`User updated successfully`, {
      classNames: {
        toast: "!bg-green-200",
        title: "font-bold !text-green-600",
      }
    });
    }else{
      toast(`Failed to update user`, {
      classNames: {
        toast: "!bg-red-200",
        title: "font-bold !text-red-600",
      },
    });
    }
    
  })
  .catch(error=>{
    console.log(error);
  });
}

  const deleteRoleHandler = async () => {
    try{
      await dispatch(deleteUserById(id)).unwrap();
      // toast('Role Deleted Successfully', {
      //   classNames: {
      //     toast: "!bg-green-100",
      //     title: "!text-green-500"
      //   }
      // });
      dispatch(getAllUsers());
    }catch(error){
      // toast('Failed to delete role', {
      //   classNames: {
      //     toast: "!bg-red-200",
      //     title: "font-bold !text-red-600",
      //   }
      // });
    }
    setOpenDialog(false);
  }

  useEffect(() => {
    if (!toastState.message) return;
  
    toast(toastState.message, {
      classNames: {
        toast:
          toastState.type === "success"
          ? "!bg-green-200"
          : "!bg-red-200",
        title:
          toastState.type === "success"
          ? "!text-green-600 font-bold"
          : "!text-red-600 font-bold",
      },
    });
    dispatch(clearToast());
  }, [toastState]);

  useEffect(()=>{
    dispatch(getAllUsers());
  },[]);

  useEffect(()=>{
    if(error?.code == "TOKEN_EXPIRED"){
      dispatch(LOGOUT());
      navigate('/login', {replace : true});
    }
  },[error, dispatch]);

    return(
      <>
      <div className='flex justify-between mb-2'>
        <h1 className='text-violet-500 text-2xl'>Users</h1>
        <Button onClick={()=> setIsModalOpen(true)}> <UserPlus /> Add</Button>
      </div>
        
        <DataTable columns={columns} data={data} newlyAddedUserId={lastAddedUserId} />
        {openDialog && <AlertDialogComponent 
          isOpen={openDialog} 
          id={id} 
          setOpenDialog={setOpenDialog} 
          deleteMethod={deleteRoleHandler}
          message="Are you sure, you want to delete this?" /> }

        {isModalOpen && <AddUserModal 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          addNewUser={addNewUser} 
          isEdit={isEdit} 
          setIsEdit={setIsEdit} 
          userEditData={userEditData} 
          editUserhandler={editUserhandler} />  }
      </>
    )
}

export default User;
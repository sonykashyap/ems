import React, { useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/components/data-table/Datatable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, UserPlus } from "lucide-react";
import AlertDialogComponent from '@/components/alert-dialog/AlertDialog';
import {getAllUsers, LOGOUT} from '@/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import AddUserModal from '@/components/add-user-modal/AddUserModal';
import { addUser } from '@/reducers/userReducer';
import {toast} from 'sonner';

export type UsersData = {
  id: string
  email: number
  status: "pending" | "Active" | "deleted"
  name: string
}


const User = () =>{

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.userReducer.users);
  const error = useSelector((state)=> state.userReducer.error);
  const [openDialog, setOpenDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [lastAddedUserId, setLastAddedUserId] = useState<string | null>(null);

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>  userAction(userData._id, "edit") }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-400 hover:text-red-400"
                onClick={() => userAction(userData._id, "delete") }
                >
                Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  
  ]
  const userAction = (id : string, action: string) => {
    setUserId(id);
    if(action === "delete"){
      setOpenDialog(true);
    }
  }


const addNewUser = (values) => {
  dispatch(addUser(values))
  .then((user)=>{
    console.log("New User ID is", user.payload.data.user._id);
    toast(`User created successfully`, {
      classNames: {
        toast: "!bg-green-200",
        title: "font-bold !text-green-600",
      },
    });
    setLastAddedUserId(user.payload.data.user._id);
    setIsModalOpen(false);
  })
  .catch(error=>{
    toast(`Failed to add user`, {
      classNames: {
        toast: "!bg-red-200",
        title: "font-bold !text-red-600",
      },
    });
    setIsModalOpen(false);
  })
}


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
        {openDialog && <AlertDialogComponent isOpen={openDialog} userId={userId} setOpenDialog={setOpenDialog} message="Are you sure, you want to delete this?" /> }
        {isModalOpen && <AddUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addNewUser={addNewUser} />  }
      </>
    )
}

export default User;
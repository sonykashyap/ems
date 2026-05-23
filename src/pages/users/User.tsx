import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/components/data-table/Datatable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, UserPlus } from "lucide-react";
import AlertDialogComponent from '@/components/alert-dialog/AlertDialog';
import {clearToast, deleteUserById, filterUsers, getAllUsers, LOGOUT} from '@/reducers/userReducer';
import AddUserModal from '@/components/add-user-modal/AddUserModal';
import { addUser, editUser } from '@/reducers/userReducer';
import {toast} from 'sonner';
import ContextMenu from '@/components/context-menu/ContextMenu';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {LoaderCircle} from 'lucide-react';
import Spinner from '@/components/spinner/Spinner';
import { Input } from '@/components/ui/input';

export type UsersData = {
  id: string
  email: number
  status: "pending" | "active" | "deleted"
  name: string
  createdAt: string
}

const User = () =>{

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state: RootState) => state.userReducer.users);
  const error = useAppSelector((state: RootState)=> state.userReducer.error);
  const isLoading = useAppSelector((state: RootState)=> state.userReducer.loading);
  const toastState = useAppSelector((state:RootState)=> state.userReducer.toast);
  const filterData = useAppSelector(state=> state.userReducer.filterData);
  const page = useAppSelector(state=> state.userReducer.page);
  const [openDialog, setOpenDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [lastAddedUserId, setLastAddedUserId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userEditData, setUserEditData] = useState<object>({});
  const [search, setSearch] = useState<string>("");

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
          <span> {Role?.roleId.name} </span>
        )
      }
    },
    {
      accessorKey: "createdAt",
      header: "Created On",
      cell: ({row})=>{
        const createdAt = row.original.createdAt;
        return (
          <span> { new Date(createdAt).toLocaleDateString("en-GB") } </span>
        )
      }
    },
   {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => {

        const status = "Active" as string

        return (

          <div className="flex items-center">

            <span
              className={`
                inline-flex items-center gap-2

                rounded-full

                px-4 py-1.5

                text-xs font-semibold
                tracking-wide

                shadow-sm

                transition-all duration-300

                ${
                  status === "Active"
                    ? `
                      bg-gradient-to-r
                      from-emerald-500
                      to-green-400

                      text-white

                      shadow-emerald-200
                    `
                    : `
                      bg-gradient-to-r
                      from-red-500
                      to-rose-400

                      text-white

                      shadow-red-200
                    `
                }
              `}
            >

              {/* Status Dot */}
              <span
                className={`
                  h-2.5 w-2.5
                  rounded-full
                  animate-pulse

                  ${
                    status === "Active"
                      ? 'bg-white'
                      : 'bg-white'
                  }
                `}
              />

              {status}

            </span>

          </div>

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

const addNewUser = async (values) => {
  try{

    await dispatch(addUser(values)).unwrap();
    dispatch(getAllUsers(page));
    setIsModalOpen(false);

  }catch(error){
    if(error instanceof Error){
      throw new Error(error.message);
    }
    throw new Error("Something went wrong");
  }
   setIsModalOpen(false);
}

const editUserhandler = (values) => {
  dispatch(editUser(values))
  .then(response=>{
    setIsModalOpen(false);
    if(response.payload.status === 200){
      dispatch(getAllUsers(page));
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
      dispatch(getAllUsers(page));
    }catch(error){
      console.log(error);
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
    dispatch(getAllUsers(page));
  },[page]);

  useEffect(()=>{
    if(error?.code == "TOKEN_EXPIRED"){
      dispatch(LOGOUT());
      navigate('/login', {replace : true});
    }
  },[error, dispatch]);

  useEffect(()=>{
    if(!search) return;
    const timer = setTimeout(()=>{
      dispatch(filterUsers(search))
    },1000);

    return ()=>{ clearTimeout(timer) };
  },[search]);

    return(
      <>
        {/* <div className='flex justify-between mb-2'>
          <h1 className='text-violet-500 text-2xl'>Employees</h1>
          <Button onClick={()=> setIsModalOpen(true)}> <UserPlus /> Add</Button>
        </div>
        <div className='mb-2'>
          <Input
          value={search}
            placeholder='Search by name, email or role'
            className='bg-white'
            onChange={(e)=>{
              setSearch(e.target.value);
            }}
          />
        </div>
        {
          isLoading ?
          <div className="flex items-center justify-center gap-6">
            <Spinner className="size-3" />
          </div> :
          <DataTable 
            columns={columns} 
            data={filterData.length > 0 ? filterData : data} 
            newlyAddedUserId={lastAddedUserId}
          />
        }
        {openDialog && <AlertDialogComponent 
          isOpen={openDialog} 
          id={id} 
          setOpenDialog={setOpenDialog} 
          deleteMethod={deleteRoleHandler}
          message="Are you sure, you want to delete this?" /> }

        {isModalOpen && 
          <AddUserModal 
            isModalOpen={isModalOpen} 
            setIsModalOpen={setIsModalOpen} 
            addNewUser={addNewUser} 
            isEdit={isEdit} 
            setIsEdit={setIsEdit} 
            userEditData={userEditData} 
            editUserhandler={editUserhandler} 
          />  } */}
          <div className="space-y-6">

    {/* Header */}
    <div
        className="flex flex-col lg:flex-row lg:items-center 
        lg:justify-between gap-4"
    >
        <div>
            <h1 className="text-3xl font-bold text-gray-800">
                Employees
            </h1>

            <p className="text-gray-500 mt-1">
                Manage employees, roles and account information
            </p>
        </div>

        <Button
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-6 rounded-2xl bg-gradient-to-r 
            from-blue-600 to-indigo-600 text-white font-semibold
            shadow-lg hover:shadow-xl transition-all duration-300"
        >
            <UserPlus className="mr-2 h-5 w-5" />
            Add Employee
        </Button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <div
            className="bg-white rounded-3xl border border-black/5 
            shadow-lg p-5"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Total Employees
                    </p>

                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {data?.length || 0}
                    </h2>
                </div>

                <div
                    className="h-14 w-14 rounded-2xl bg-blue-100 
                    flex items-center justify-center text-2xl"
                >
                    👨‍💼
                </div>
            </div>
        </div>

        <div
            className="bg-white rounded-3xl border border-black/5 
            shadow-lg p-5"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Active Users
                    </p>

                    <h2 className="text-3xl font-bold text-green-600 mt-2">
                        {data?.length || 0}
                    </h2>
                </div>

                <div
                    className="h-14 w-14 rounded-2xl bg-green-100 
                    flex items-center justify-center text-2xl"
                >
                    ✅
                </div>
            </div>
        </div>

        <div
            className="bg-white rounded-3xl border border-black/5 
            shadow-lg p-5"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Departments
                    </p>

                    <h2 className="text-3xl font-bold text-purple-600 mt-2">
                        08
                    </h2>
                </div>

                <div
                    className="h-14 w-14 rounded-2xl bg-purple-100 
                    flex items-center justify-center text-2xl"
                >
                    🏢
                </div>
            </div>
        </div>

        <div
            className="bg-white rounded-3xl border border-black/5 
            shadow-lg p-5"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        New This Month
                    </p>

                    <h2 className="text-3xl font-bold text-orange-500 mt-2">
                        12
                    </h2>
                </div>

                <div
                    className="h-14 w-14 rounded-2xl bg-orange-100 
                    flex items-center justify-center text-2xl"
                >
                    🚀
                </div>
            </div>
        </div>
    </div>

    {/* Main Table Card */}
    <div
        className="bg-white rounded-3xl border border-black/5 
        shadow-xl overflow-hidden"
    >

        {/* Top Actions */}
        <div
            className="p-6 border-b border-gray-100 
            flex flex-col lg:flex-row lg:items-center 
            lg:justify-between gap-4"
        >

            {/* Search */}
            <div className="relative w-full lg:max-w-md">
                <Input
                    value={search}
                    placeholder="Search by name, email or role"
                    className="bg-gray-50 border-gray-200 rounded-2xl 
                    h-12 pl-4 focus-visible:ring-4 focus-visible:ring-blue-100"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>

            {/* Right Filters */}
            <div className="flex flex-wrap gap-3">

                <select
                    className="h-12 px-4 rounded-2xl border border-gray-200 
                    bg-gray-50 text-sm outline-none"
                >
                    <option>All Roles</option>
                    <option>Admin</option>
                    <option>Employee</option>
                </select>

                <select
                    className="h-12 px-4 rounded-2xl border border-gray-200 
                    bg-gray-50 text-sm outline-none"
                >
                    <option>Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
        </div>

        {/* Table */}
        <div className="p-4">

            {
                isLoading ?

                    <div className="flex items-center justify-center py-20">
                        <div
                            className="flex flex-col items-center gap-4"
                        >
                            <Spinner className="size-8 text-blue-600" />

                            <p className="text-sm text-gray-500">
                                Loading employees...
                            </p>
                        </div>
                    </div>

                    :

                    <div
                        className="rounded-2xl border border-gray-100 overflow-hidden"
                    >
                        <DataTable
                            columns={columns}
                            data={filterData.length > 0 ? filterData : data}
                            newlyAddedUserId={lastAddedUserId}
                        />
                    </div>
            }
        </div>

        {/* Footer */}
        <div
            className="px-6 py-4 border-t border-gray-100 
            flex flex-col md:flex-row md:items-center 
            md:justify-between gap-3"
        >
            <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                    {(filterData.length > 0 ? filterData : data)?.length || 0}
                </span>{" "}
                employees
            </p>
        </div>
    </div>

    {/* Delete Dialog */}
    {
        openDialog && (
            <AlertDialogComponent
                isOpen={openDialog}
                id={id}
                setOpenDialog={setOpenDialog}
                deleteMethod={deleteRoleHandler}
                message="Are you sure, you want to delete this?"
            />
        )
    }

    {/* Add/Edit Modal */}
    {
        isModalOpen && (
            <AddUserModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                addNewUser={addNewUser}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                userEditData={userEditData}
                editUserhandler={editUserhandler}
            />
        )
    }
</div>
      </>
    )
}

export default User;
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/components/data-table/Datatable';
import { UserRoundCog } from "lucide-react";
import { 
  addRole, 
  deleteRole, 
  editRole, 
  getAllRoles, 
  clearToast, 
  clearAllStates } from '@/reducers/roleReducer';
import ModalDialog from '@/components/modal-dialog/ModalDialog';
import {z} from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle } from '@/components/ui/dialog';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {toast} from 'sonner';
import ContextMenu from '@/components/context-menu/ContextMenu';
import AlertDialogComponent from '@/components/alert-dialog/AlertDialog';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';

export type RoleData = {
  id: string
  role: string
}

const Role = () => {

  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const roles = useAppSelector((state:RootState) => state.roleReducer.roles);
  const toastState = useAppSelector((state) => state.roleReducer.toast);
  const isLoading = useAppSelector((state) => state.roleReducer.loading);
  const [openDialog, setOpenDialog] = useState(false);
  const [roleData, setRoleEditData] = useState<object | null>({});
  const [id, setId] = useState<string | null>(null);
  const [isEdit,setIsEdit] = useState<boolean>(false);
  const page = useAppSelector(state=> state.roleReducer.page);
  
  const columns: ColumnDef<RoleData>[] = [
    {
      accessorKey: "name",
      header: "Role",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const roleData = row.original
  
        return (
          <ContextMenu data={roleData} action={userAction} />
        )
      },
    },
  ]

  const formSchema = z.object({
    role: z.string(),
    roleId: z.string().nullable().optional()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      !isEdit ? 
      await dispatch(addRole(values.role)).unwrap() : 
      await dispatch(editRole(values)).unwrap();
      setIsModalOpen(false);
      dispatch(getAllRoles());
      if(isEdit){
        setIsEdit(false);
      }
    }catch(error){
      console.log(error);
    }
    resetFormValue();
  }
  
  const resetFormValue = () => { // empty form value upon cancel or submission of form
    form.reset({
      role: ""
    });
  }

  const addRoleHandler = () => {
    setIsModalOpen(!isModalOpen);
  }

   const userAction = (id : string, data: object | null, action: string) => {
    setId(id);
    if(action === "delete"){
      setOpenDialog(true);
    }else if(action == 'edit'){
      form.reset({
        role: data?.name,
        roleId: id
      })
      setIsEdit(true);
      setIsModalOpen(true);
    }
  }

  const deleteRoleHandler = async () => {
    try{

      await dispatch(deleteRole(id)).unwrap();
      dispatch(getAllRoles());
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
    dispatch(getAllRoles(page));
  
    //Cleanup code goes here
    return () => {
      console.log("Cleanup goes here...")
    };
  },[page]);

  return(
    <>
      {/* <div className='flex justify-between mb-2'>
          <h1 className='text-violet-500 text-2xl'>Roles</h1>
          <Button onClick={addRoleHandler}> <UserRoundCog /> Add Role</Button>
      </div>
      {
      isModalOpen && 
      <ModalDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Form {...form}>
                    
          <DialogContent className=" md:max-w-xl">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter className='mt-4'>
                  <DialogClose asChild>
                      <Button variant="outline" type="button" onClick={resetFormValue}> Cancel </Button>
                  </DialogClose>
                  <Button type="submit" className="bg-violet-500"> { !isEdit ? "Add" : "Update" } </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Form>
      </ModalDialog>
      }
      <DataTable columns={columns} data={roles} />
      {openDialog &&  <AlertDialogComponent 
        isOpen={openDialog} 
        id={id} 
        setOpenDialog={setOpenDialog} 
        deleteMethod={deleteRoleHandler}
        message="Are you sure, you want to delete this?" 
      />} */}
      <div className="space-y-6">

    {/* Header */}
    <div
        className="flex flex-col lg:flex-row lg:items-center 
        lg:justify-between gap-4"
    >
        <div>
            <h1 className="text-3xl font-bold text-gray-800">
                Roles & Permissions
            </h1>

            <p className="text-gray-500 mt-1">
                Manage employee roles and access permissions
            </p>
        </div>

        <Button
            onClick={addRoleHandler}
            className="h-12 px-6 rounded-2xl bg-gradient-to-r 
            from-blue-600 to-indigo-600 text-white font-semibold
            shadow-lg hover:shadow-xl transition-all duration-300"
        >
            <UserRoundCog className="mr-2 h-5 w-5" />
            Add Role
        </Button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* Total Roles */}
        <div
            className="bg-white rounded-3xl border border-black/5 
            shadow-lg p-5"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Total Roles
                    </p>

                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {roles?.length || 0}
                    </h2>
                </div>

                <div
                    className="h-14 w-14 rounded-2xl bg-blue-100 
                    flex items-center justify-center text-2xl"
                >
                    🛡️
                </div>
            </div>
        </div>

        {/* Admin */}
        <div
            className="bg-white rounded-3xl border border-black/5 
            shadow-lg p-5"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Admin Roles
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600 mt-2">
                        02
                    </h2>
                </div>

                <div
                    className="h-14 w-14 rounded-2xl bg-indigo-100 
                    flex items-center justify-center text-2xl"
                >
                    👑
                </div>
            </div>
        </div>

        {/* Employee */}
        <div
            className="bg-white rounded-3xl border border-black/5 
            shadow-lg p-5"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Employee Roles
                    </p>

                    <h2 className="text-3xl font-bold text-green-600 mt-2">
                        06
                    </h2>
                </div>

                <div
                    className="h-14 w-14 rounded-2xl bg-green-100 
                    flex items-center justify-center text-2xl"
                >
                    👨‍💻
                </div>
            </div>
        </div>

        {/* Permissions */}
        <div
            className="bg-white rounded-3xl border border-black/5 
            shadow-lg p-5"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Active Permissions
                    </p>

                    <h2 className="text-3xl font-bold text-orange-500 mt-2">
                        24
                    </h2>
                </div>

                <div
                    className="h-14 w-14 rounded-2xl bg-orange-100 
                    flex items-center justify-center text-2xl"
                >
                    🔐
                </div>
            </div>
        </div>
    </div>

    {/* Main Table Card */}
    <div
        className="bg-white rounded-3xl border border-black/5 
        shadow-xl overflow-hidden"
    >

        {/* Top */}
        <div
            className="px-6 py-5 border-b border-gray-100 
            flex flex-col lg:flex-row lg:items-center 
            lg:justify-between gap-4"
        >

            <div>
                <h2 className="text-xl font-bold text-gray-800">
                    Role Listing
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    View and manage all available roles
                </p>
            </div>

            <div className="flex gap-3">

                <button
                    className="h-11 px-5 rounded-xl border border-gray-200 
                    bg-white text-gray-700 font-medium hover:bg-gray-100
                    transition-all duration-300"
                >
                    Export
                </button>

                <button
                    className="h-11 px-5 rounded-xl bg-gradient-to-r 
                    from-blue-600 to-indigo-600 text-white font-medium
                    hover:shadow-lg transition-all duration-300"
                >
                    Permissions
                </button>
            </div>
        </div>

        {/* Table */}
        <div className="p-4">

            <div
                className="rounded-2xl overflow-hidden border border-gray-100"
            >
                <DataTable columns={columns} data={roles} />
            </div>
        </div>

        {/* Footer */}
        <div
            className="px-6 py-4 border-t border-gray-100 
            flex flex-col md:flex-row md:items-center 
            md:justify-between gap-3"
        >

            <p className="text-sm text-gray-500">
                Total{" "}
                <span className="font-semibold text-gray-700">
                    {roles?.length || 0}
                </span>{" "}
                roles available
            </p>
        </div>
    </div>

    {/* Add/Edit Modal */}
    {
        isModalOpen &&
        <ModalDialog
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
        >
            <Form {...form}>

                <DialogContent
                    className="md:max-w-xl rounded-3xl border-none p-0 overflow-hidden"
                >

                    {/* Header */}
                    <div
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 
                        px-8 py-6"
                    >
                        <h2 className="text-2xl font-bold text-white">
                            {!isEdit ? "Create Role" : "Update Role"}
                        </h2>

                        <p className="text-blue-100 mt-1 text-sm">
                            Manage role permissions and access
                        </p>
                    </div>

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="p-8"
                    >

                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 gap-5">

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel className="text-gray-700 font-medium">
                                            Role Name
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter role name"
                                                className="h-12 rounded-2xl border-gray-200 
                                                bg-gray-50 focus-visible:ring-4 
                                                focus-visible:ring-blue-100"
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Footer */}
                        <DialogFooter className="mt-8 gap-3">

                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={resetFormValue}
                                    className="h-11 rounded-xl px-6"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                className="h-11 rounded-xl px-6 
                                bg-gradient-to-r from-blue-600 to-indigo-600 
                                hover:shadow-lg text-white"
                            >
                                {!isEdit ? "Add Role" : "Update Role"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Form>
        </ModalDialog>
    }

    {/* Delete Dialog */}
    {
        openDialog &&
        <AlertDialogComponent
            isOpen={openDialog}
            id={id}
            setOpenDialog={setOpenDialog}
            deleteMethod={deleteRoleHandler}
            message="Are you sure, you want to delete this?"
        />
    }
</div>
    </>
  )
}

export default Role;
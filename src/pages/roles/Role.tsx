import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React, { useEffect, useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/components/data-table/Datatable';
import { UserRoundCog } from "lucide-react";
import { addRole, deleteRole, editRole, getAllRoles, clearToast } from '@/reducers/roleReducer';
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
  const spinner = useAppSelector((state) => state.roleReducer.loader);
  const [openDialog, setOpenDialog] = useState(false);
  const [roleData, setRoleEditData] = useState<object | null>({});
  const [id, setId] = useState<string | null>(null);
  const [isEdit,setIsEdit] = useState<boolean>(false);
  // const [editData, setEditData] = useState<Object | null>(null);
  
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
      !isEdit ? await dispatch(addRole(values.role)).unwrap() : await dispatch(editRole(values)).unwrap();
      setIsModalOpen(false);
      dispatch(getAllRoles());
      if(isEdit){
        setIsEdit(false);
      }
    }catch(error){
      
    }
    form.reset({
      role: ""
    })
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
      toast('Role Deleted Successfully', {
        classNames: {
          toast: "!bg-green-100",
          title: "!text-green-500"
        }
      });
      dispatch(getAllRoles());
    }catch(error){
      toast('Failed to delete role', {
        classNames: {
          toast: "!bg-red-200",
          title: "font-bold !text-red-600",
        }
      });
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
    dispatch(getAllRoles());
  
    return () => {
      console.log("Cleanup goes here...")
    };
  },[]);

  return(
    <>
      <div className='flex justify-between mb-2'>
          <h1 className='text-violet-500 text-2xl'>Roles</h1>
          <Button onClick={addRoleHandler}> <UserRoundCog /> Add Role</Button>
      </div>
      {
      isModalOpen && 
      <ModalDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
        <Form {...form}>
                    
          <DialogContent className="max-w-full md:max-w-[500px]">
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
                      <Button variant="outline" type="button" > Cancel </Button>
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
      />}
    </>
  )
}

export default Role;
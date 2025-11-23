import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React, { useEffect } from 'react';
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/components/data-table/Datatable';
import { UserRoundCog } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addRole, getAllRoles } from '@/reducers/roleReducer';

export type RoleData = {
  id: string
  role: string
}

const Role = () => {
    const dispatch = useDispatch();
    const columns: ColumnDef<RoleData>[] = [
    {
      accessorKey: "role",
      header: "Role",
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
                onClick={() =>  userAction(userData._id, userData, "edit") }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-400 hover:text-red-400"
                onClick={() => userAction(userData._id, null, "delete") }
                >
                Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  
    ]

    const data = [
      {id: "dsvdsvdfvdfvdvdvdvd", role: "User"},
      {id: "dsvdsvdfvdfvdvdvdvd", role: "Admin"},
      {id: "dsvdsvdfvdfvdvdvdvd", role: "Employee"},
    ]

    const addRolehandler = () => {
      dispatch(addRole());
    }

    useEffect(()=>{
      dispatch(getAllRoles());
    },[]);

    return(
        <>
            <div className='flex justify-between mb-2'>
                <h1 className='text-violet-500 text-2xl'>Users</h1>
                <Button onClick={addRolehandler}> <UserRoundCog /> Add</Button>
            </div>
            <DataTable columns={columns} data={data} />
        </>
    )
}

export default Role;
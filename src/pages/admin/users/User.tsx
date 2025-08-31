import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/components/data-table/Datatable';

export type UsersData = {
  id: string
  email: number
  status: "pending" | "Active" | "deleted"
  name: string
}

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
        const status = row.getValue("status") as string
        return (
            <span className={`text-white p-1 text-sm rounded-sm ${status === "Active" ? "bg-violet-400" : "bg-red-400"} `}> {status} </span>
        )
    }
  }
  
]

const data = [
    {
        id: "dfvnlkfnfdv",
        name: "Sony Kumar",
        email: "sam@gmail.com",
        status: "Active"

    },
    {
        id: "dsvddfdgreger",
        name: "Sony Kashyap",
        email: "sony@gmail.com",
        status: "Deactive"

    }
]

const User = () =>{
    return(
        <>
            <h1>Users</h1>
            <DataTable columns={columns} data={data} />

        </>
    )
}

export default User;
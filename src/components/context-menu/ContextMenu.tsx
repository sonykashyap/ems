import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from "lucide-react";


type Props = {
  action: (id: string, data: Object | null, actionType:string) => void,
  data: Object
};

const ContextMenu = ({action, data}: Props) => {
    return(
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>  action(data._id, data, "edit") }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-400 hover:text-red-400"
                onClick={() => action(data._id, null, "delete")}
                >
                Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
    )
}

export default ContextMenu;
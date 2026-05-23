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

            {/* Trigger */}
            <DropdownMenuTrigger asChild>

              <Button
                variant="ghost"
                className="
                  h-10 w-10
                  rounded-2xl

                  border border-transparent

                  text-slate-600

                  transition-all duration-300

                  hover:bg-violet-50
                  hover:text-violet-700
                  hover:border-violet-100
                  hover:shadow-md

                  data-[state=open]:bg-violet-100
                  data-[state=open]:text-violet-700
                "
              >

                <span className="sr-only">
                  Open menu
                </span>

                <MoreHorizontal className="h-5 w-5" />

              </Button>

            </DropdownMenuTrigger>

            {/* Menu Content */}
            <DropdownMenuContent
              align="end"
              className="
                w-48

                rounded-3xl
                border border-slate-200

                bg-white/95
                backdrop-blur-2xl

                p-2

                shadow-[0_20px_60px_rgba(0,0,0,0.12)]

                animate-in
                fade-in-0
                zoom-in-95
              "
            >

              {/* Edit */}
              <DropdownMenuItem
                onClick={() => action(data._id, data, "edit")}
                className="
                  group

                  flex items-center gap-3

                  rounded-2xl
                  px-3 py-3

                  text-sm font-medium
                  text-slate-700

                  cursor-pointer

                  transition-all duration-200

                  hover:bg-violet-50
                  hover:text-violet-700
                  focus:bg-violet-50
                  focus:text-violet-700
                "
              >

                <div className="
                  flex items-center justify-center

                  h-9 w-9

                  rounded-xl

                  bg-violet-100
                  text-violet-600

                  transition-all duration-200

                  group-hover:bg-violet-600
                  group-hover:text-white
                ">
                  ✏️
                </div>

                <span>
                  Edit
                </span>

              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-2 bg-slate-200" />

              {/* Delete */}
              <DropdownMenuItem
                onClick={() => action(data._id, null, "delete")}
                className="
                  group

                  flex items-center gap-3

                  rounded-2xl
                  px-3 py-3

                  text-sm font-medium
                  text-red-500

                  cursor-pointer

                  transition-all duration-200

                  hover:bg-red-50
                  hover:text-red-600
                  focus:bg-red-50
                  focus:text-red-600
                "
              >

                <div className="
                  flex items-center justify-center

                  h-9 w-9

                  rounded-xl

                  bg-red-100
                  text-red-500

                  transition-all duration-200

                  group-hover:bg-red-500
                  group-hover:text-white
                ">
                  🗑️
                </div>

                <span>
                  Delete
                </span>

              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>
        </>
    )
}

export default ContextMenu;
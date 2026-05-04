import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {motion} from 'framer-motion';
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { getPagination } from "@/helpers/helpers";
import { getAllUsers, setPage } from "@/reducers/userReducer";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  newlyAddedUserId?: string | null,
}

export function DataTable<TData, TValue>({
  columns,
  data,
  newlyAddedUserId
}: DataTableProps<TData, TValue>) {
  const dispatch = useAppDispatch();
  const page = useAppSelector(state=> state.userReducer.page);
  const totalPages = useAppSelector(state=> state.userReducer.totalPages);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })
  const pages = getPagination(page, totalPages);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  }

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-violet-500 text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="border bg-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const isNew = row.original.id === newlyAddedUserId;
                return(
                  <motion.tr
                    key={row.id}
                    layout
                    initial={isNew ? { backgroundColor: "lavender", opacity: 1 } : false} // light violet
                    animate={{ backgroundColor: "white" }}
                    transition={{ duration: 2 }}
                    data-state={row.getIsSelected() && "selected"}
                    className="transition-colors border"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </motion.tr>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {
        pages.length > 0 &&
        <div className="flex items-center justify-end space-x-2 mt-4">

          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
              Prev
            </Button>

            {/* Page Numbers */}
            {pages.map((p, index) =>
              p === "..." ? (
                <span key={index} className="px-2">...</span>
              ) : (
                <Button
                  key={index}
                  variant={p === page ? "default" : "outline"}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </Button>
              )
            )}

            {/* Next */}
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </Button>


        </div>
      }
    </div>
    
  )
}
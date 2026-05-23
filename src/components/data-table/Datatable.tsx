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
    <div className="space-y-5">

  {/* Table Container */}
  <div className="
    overflow-hidden
    rounded-3xl
    border border-slate-200
    bg-white
    shadow-[0_10px_40px_rgba(0,0,0,0.04)]
    backdrop-blur-xl
  ">

    <Table>

      {/* Header */}
      <TableHeader className="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500">

        {table.getHeaderGroups().map((headerGroup) => (

          <TableRow
            key={headerGroup.id}
            className="border-b border-white/10 hover:bg-transparent"
          >

            {headerGroup.headers.map((header) => {

              return (
                <TableHead
                  key={header.id}
                  className="
                    h-14
                    px-6
                    text-sm
                    font-semibold
                    tracking-wide
                    text-slate-200
                    whitespace-nowrap
                  "
                >

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

      {/* Body */}
      <TableBody className="bg-white">

        {table.getRowModel().rows?.length ? (

          table.getRowModel().rows.map((row, index) => {

            const isNew = row.original.id === newlyAddedUserId;

            return (
              <motion.tr
                key={row.id}
                layout
                initial={
                  isNew
                    ? {
                        backgroundColor: "rgba(139, 92, 246, 0.15)",
                        opacity: 0.6,
                      }
                    : false
                }
                animate={{
                  backgroundColor: "rgba(255,255,255,1)",
                  opacity: 1,
                }}
                transition={{ duration: 2 }}
                data-state={row.getIsSelected() && "selected"}
                className={`
                  border-b border-slate-100
                  transition-all duration-300

                  hover:bg-violet-50/50
                  hover:shadow-sm

                  ${
                    row.getIsSelected()
                      ? 'bg-violet-50'
                      : index % 2 === 0
                        ? 'bg-white'
                        : 'bg-slate-50/40'
                  }
                `}
              >

                {row.getVisibleCells().map((cell) => (

                  <TableCell
                    key={cell.id}
                    className="
                      px-6 py-4
                      text-sm
                      text-slate-700
                      font-medium
                      whitespace-nowrap
                    "
                  >

                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}

                  </TableCell>

                ))}

              </motion.tr>
            )
          })

        ) : (

          <TableRow>

            <TableCell
              colSpan={columns.length}
              className="h-40 text-center"
            >

              <div className="flex flex-col items-center justify-center gap-3">

                <div className="
                  flex h-16 w-16 items-center justify-center
                  rounded-2xl
                  bg-slate-100
                ">
                  <span className="text-3xl">📭</span>
                </div>

                <div>
                  <p className="text-lg font-semibold text-slate-700">
                    No results found
                  </p>

                  <p className="text-sm text-slate-400">
                    Try adjusting your filters or search query
                  </p>
                </div>

              </div>

            </TableCell>

          </TableRow>

        )}

      </TableBody>

    </Table>

  </div>

  {/* Pagination */}
  {
    pages.length > 0 &&

    <div className="
      flex flex-col md:flex-row
      items-center justify-between
      gap-4
      rounded-3xl
      border border-slate-200
      bg-white
      px-5 py-4
      shadow-sm
    ">

      {/* Left Info */}
      <div className="text-sm text-slate-500">
        Page{" "}
        <span className="font-semibold text-slate-800">
          {page}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-800">
          {totalPages}
        </span>
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center gap-2 flex-wrap">

        {/* Prev */}
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          variant="outline"
          className="
            h-11 w-11
            rounded-2xl
            border-slate-200
            bg-white
            hover:bg-slate-100
            disabled:opacity-40
          "
        >
          ←
        </Button>

        {/* Pages */}
        {pages.map((p, index) =>

          p === "..." ? (

            <span
              key={index}
              className="px-2 text-slate-400"
            >
              ...
            </span>

          ) : (

            <Button
              key={index}
              variant={p === page ? "default" : "outline"}
              onClick={() => handlePageChange(p)}
              className={`
                h-11 min-w-[44px]
                rounded-2xl
                font-semibold
                transition-all duration-300

                ${
                  p === page
                    ? `
                      bg-gradient-to-r
                      from-violet-600
                      to-fuchsia-500
                      text-white
                      border-0
                      shadow-lg
                      hover:from-violet-700
                      hover:to-fuchsia-600
                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-700
                      hover:bg-violet-50
                      hover:text-violet-700
                    `
                }
              `}
            >
              {p}
            </Button>

          )
        )}

        {/* Next */}
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          variant="outline"
          className="
            h-11 w-11
            rounded-2xl
            border-slate-200
            bg-white
            hover:bg-slate-100
            disabled:opacity-40
          "
        >
          →
        </Button>

      </div>

    </div>
  }

</div>
    
  )
}
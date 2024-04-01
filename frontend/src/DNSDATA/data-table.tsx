import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PieChart, Pie, Tooltip } from "recharts";
import { useDns } from "@/Context/DnsContext";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const {dnsCount} = useDns()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 7
      }
    }
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between bg-violet-500 p-4 rounded-lg">
        <div className="flex space-x-6">
        <Input
          placeholder="Search by name"
          value={(table.getColumn("name")?.getFilterValue() as string) || ""}
          onChange={(e) => {
            table.getColumn("name")?.setFilterValue(e.target.value);
          }}
          className="max-w-64 border-white text-white placeholder:text-white"
          />
        <Input
          placeholder="Search by Record Type"
          value={(table.getColumn("recordType")?.getFilterValue() as string) || ""}
          onChange={(e) => {
            table.getColumn("recordType")?.setFilterValue(e.target.value);
          }}
          className="max-w-64 border-white text-white placeholder:text-white"
          />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-transparent border border-white hover:bg-violet-500">
                See Analytics
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Analytics</DialogTitle>
              </DialogHeader>
              <PieChart width={350} height={380}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={dnsCount}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                  />
                <Tooltip />
              </PieChart>
            </DialogContent>
          </Dialog>
      </div>
      <div className="rounded-md border p-2">
        <Table>
          <TableHeader className="bg-violet-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 py-4">
              <Button variant='outline' className="" size='sm' onClick={() => {
                table.previousPage()
              }}
              disabled={!table.getCanPreviousPage()}
              >Prev
              </Button>
              <Button variant='outline' className="" size='sm' onClick={() => {
                table.nextPage()
              }}
              disabled={!table.getCanNextPage()}
              >Next
              </Button>
        </div>
      </div>
    </div>
  );
}

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  disablePrev: boolean;
  isLoading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  handleNextPage,
  handlePreviousPage,
  disablePrev,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Function to render skeleton rows during loading
  const renderSkeleton = () => (
    <div className="flex items-center min-h-[50px]">
      <div className="h-4 w-2/4 animate-pulse rounded bg-gray-300   "></div>
    </div>
  );

  return (
    <div className="w-full p-4 lg:p-10">
      <div className="overflow-x-auto">
        <Table className="min-w-full lg:w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx} className="h-12">
                    {columns.map((_, colIdx) => (
                      <TableCell key={colIdx} className="p-2 max-w-10">
                        {renderSkeleton()}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows?.length
                ? table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="h-12"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="p-2 max-w-10">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : data.length !==0 && (
                    <TableRow className="h-12">
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
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <button
          className="rounded bg-gray-200 px-2 py-2 text-sm disabled:opacity-50 lg:px-4 lg:text-base"
          onClick={handlePreviousPage}
          disabled={disablePrev}
        >
          Previous
        </button>
        <button
          className="rounded bg-gray-200 px-2 py-2 text-sm lg:px-4 lg:text-base"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

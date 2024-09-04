import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Pokemon = {
  name: string;
  image: string;
  types: string;
};

export const columns: ColumnDef<Pokemon>[] = [
  {
    header: "Name",
    accessorFn: (row) => row.name,
  },
  {
    header: "Image",
    accessorFn: (row) => row.image,
    cell: ({ row }) => (
      <Image src={row.original.image} alt={row.original.name} width={50} height={50}/>
    ),
  },
  {
    header: "Types",
    accessorFn: (row) => row.types,
  },
];

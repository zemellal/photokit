"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { lenses as Lenses } from "@prisma/client";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

export const columnsLenses: ColumnDef<Lenses>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "brands.name",
    header: "Brand",
  },
  {
    accessorKey: "mounts.name",
    header: "Mount",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "zoom_prime",
    header: "Zoom/Prime",
  },
  {
    accessorKey: "max_aperture",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Aperture" />
    ),
  },
  {
    accessorKey: "min_fl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Focal length (min)" />
    ),
  },
  {
    accessorKey: "max_fl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Focal length (max)" />
    ),
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight" />
    ),
  },
];

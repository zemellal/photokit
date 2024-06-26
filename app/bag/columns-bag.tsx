"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

import { locale } from "@/lib";
import { DialogOwnershipActions } from "@/components/dialog-ownership-actions";
import { OwnershipWithProducts } from "@/lib/queries/ownership";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const columnsBag: ColumnDef<OwnershipWithProducts>[] = [
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
    id: "name",
    accessorKey: "products.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableHiding: false,
    cell: ({ row }) => {
      const original = row.original;
      return (
        <Link href={`/product/${encodeURI(original.products.id)}`}>
          {original.products.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "products.weight",
    id: "weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("weight"));
      const formatted = new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "gram",
        unitDisplay: "short",
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "serial_number",
    header: "Serial Number",
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => {
      const type = row.original.condition;
      return (
        <Badge className="capitalize" variant={"secondary"}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "purchased_on",
    id: "purchased_on",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchased On" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("purchased_on")) {
        return <div>n/a</div>;
      }
      const date = row.getValue("purchased_on") as Date;
      const formatted = new Intl.DateTimeFormat(locale, {
        dateStyle: "short",
      }).format(date);

      return <time className="">{formatted}</time>;
    },
  },
  {
    accessorKey: "purchased_for",
    id: "purchased_for",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchased For" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("purchased_for"));
      const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return <DialogOwnershipActions item={item} />;
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

import { formatCurrency, formatWeight, locale } from "@/lib";
import { DialogOwnershipActions } from "@/components/dialogs/dialog-ownership-actions";
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
      const amount = row.original.products.weight;

      return <div className="">{formatWeight(amount)}</div>;
    },
  },
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "itemCondition",
    header: "Condition",
    cell: ({ row }) => {
      const type = row.original.itemCondition;
      return (
        <Badge className="capitalize" variant={"secondary"}>
          {type?.replace(/Condition$/, "")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "purchaseDate",
    id: "purchaseDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase Date" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("purchaseDate")) {
        return <div>n/a</div>;
      }
      const date = row.getValue("purchaseDate") as Date;
      const formatted = new Intl.DateTimeFormat(locale, {
        dateStyle: "short",
      }).format(date);

      return <time className="">{formatted}</time>;
    },
  },
  {
    accessorKey: "price",
    id: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchased For" />
    ),
    cell: ({ row }) => {
      const amount = row.original.price;

      return <div className="">{formatCurrency(amount)}</div>;
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

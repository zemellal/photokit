"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@prisma/client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency, formatWeight, locale } from "@/lib";
import { Badge } from "@/components/ui/badge";
import { DialogProductItem } from "@/components/dialogs/dialog-product-item";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const columnsProducts: ColumnDef<Product>[] = [
  {
    id: "add",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DialogProductItem product={item}>
          <Button
            className="-mr-4 invisible group-hover:visible size-6"
            variant={"default"}
            size={"icon"}
          >
            <Plus className="size-3.5" />
          </Button>
        </DialogProductItem>
      );
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableHiding: false,
    cell: ({ row }) => {
      const original = row.original;
      return (
        <Link href={`/product/${encodeURI(original.id)}`}>{original.name}</Link>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <div className="capitalize">
          <Badge variant={"secondary"}>{type}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "weight",
    id: "weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight" />
    ),
    cell: ({ row }) => {
      const weight = row.original.weight;
      return <div className="">{formatWeight(weight)}</div>;
    },
  },
  {
    accessorKey: "price",
    id: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="price" />
    ),
    cell: ({ row }) => {
      const amount = row.original.price;

      return <div className="">{formatCurrency(amount)}</div>;
    },
  },
  {
    accessorKey: "releaseDate",
    id: "releaseDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Release Date" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("releaseDate")) {
        return <div>n/a</div>;
      }
      const date = row.getValue("releaseDate") as Date;
      const formatted = new Intl.DateTimeFormat(locale, {
        dateStyle: "short",
      }).format(date);

      return <time className="">{formatted}</time>;
    },
  },
];

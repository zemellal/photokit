"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@prisma/client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { locale } from "@/lib";
import { Badge } from "@/components/ui/badge";
import { DialogProductItem } from "@/components/dialog-product-item";
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
            className="-mr-8 invisible group-hover:visible"
            variant={"default"}
            size={"sm"}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </DialogProductItem>
      );
    },
  },
  {
    accessorKey: "brands.name",
    header: "Brand",
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
      const amount = parseFloat(row.getValue("weight"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: "gram",
        unitDisplay: "short",
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "price",
    id: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="price" />
    ),
    cell: ({ row }) => {
      if (typeof row.getValue("price") !== "number") {
        return <div className="">n/a</div>;
      }
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "date_announced",
    id: "date_announced",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Release Date" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("date_announced")) {
        return <div>n/a</div>;
      }
      const date = row.getValue("date_announced") as Date;
      const formatted = new Intl.DateTimeFormat(locale, {
        dateStyle: "short",
      }).format(date);

      return <time className="">{formatted}</time>;
    },
  },
];

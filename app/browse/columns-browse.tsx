"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@prisma/client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { locale } from "@/lib";
import { Badge } from "@/components/ui/badge";
import { DialogProductItem } from "@/components/dialog-product-item";

export const columnsProducts: ColumnDef<Product>[] = [
  {
    id: "add",
    cell: ({ row }) => {
      const item = row.original;
      return <DialogProductItem product={item} />;
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

      return <div className="">{formatted}</div>;
    },
  },
];

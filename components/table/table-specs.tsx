import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Offer } from "@prisma/client";
import { formatCurrency, formatDate } from "@/lib";

type SpecsTableRow = {
  label?: string;
  value?: string | number | null;
};

interface SpecsTableProps {
  data: SpecsTableRow[];
  caption?: string;
}

export function SpecsTable({ data, caption }: SpecsTableProps) {
  // filter the non complete rows
  const rows = data.filter((row) => row.label && row.value);
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.label}>
            <TableCell className="font-medium text-right w-[50%]">
              {row.label}
            </TableCell>
            <TableCell className="">{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function OffersTable({ offers }: { offers: Offer[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {offers.map((offer) => (
          <TableRow key={String(offer.date)}>
            <TableCell>
              {formatDate(offer.date, {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </TableCell>
            <TableCell>
              {offer.itemCondition.replace(/Condition$/, "")}
            </TableCell>
            <TableCell>{formatCurrency(offer.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

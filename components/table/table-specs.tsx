import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "../ui/table";

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

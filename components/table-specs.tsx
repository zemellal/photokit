import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "./ui/table";

type SpecsTableRow = {
  label?: string;
  value?: string | number | null;
  unit?: string | null;
};

interface SpecsTableProps {
  data: SpecsTableRow[];
  caption?: string;
}

export function SpecsTable({ data, caption }: SpecsTableProps) {
  return (
    <>
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableBody>
          {data.map((row) => (
            <React.Fragment key={row.label}>
              {row.label && row.value && (
                <>
                  <TableRow>
                    <TableCell className="font-medium text-right w-[50%]">
                      {row.label}
                    </TableCell>
                    <TableCell className="">
                      {row.value} {row.unit}
                    </TableCell>
                  </TableRow>{" "}
                </>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

"use client";

import React from "react";

import { Product } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OwnershipForm } from "./form/form-ownership";

export const DialogProductItem = ({ product }: { product: Product }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="-mr-8 invisible group-hover:visible"
          variant={"outline"}
          size={"sm"}
        >
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Add this poduct to your kit. Also include the serial number, price,
            and date you acquired this cool new toy!
          </DialogDescription>
        </DialogHeader>
        <OwnershipForm
          setOpen={setOpen}
          product={{
            id: product.id,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
DialogProductItem.displayName = "DialogProductItem";

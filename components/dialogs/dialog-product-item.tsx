"use client";

import React, { ReactNode } from "react";

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
import { OwnershipForm } from "@/components/form/form-ownership";
import { Plus } from "lucide-react";

export const DialogProductItem = ({
  product,
  children,
}: {
  product: Product;
  children?: ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Add this poduct to your bag. Also include the serial number, price,
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

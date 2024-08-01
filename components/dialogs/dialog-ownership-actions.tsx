"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

import { deleteOwnershipAction } from "@/app/bag/actions";
import { OwnershipWithProducts } from "@/lib/queries/ownership";
import { OwnershipForm } from "@/components/form/form-ownership";
import { AddProductToKitForm } from "@/components/form/form-add-product-to-kit";

export function DialogOwnershipActions({
  item,
}: {
  item: OwnershipWithProducts;
}) {
  type ViewT = "edit" | "delete" | "addToKit";
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState<ViewT>("delete");

  function onDelete() {
    deleteOwnershipAction(item.id);
    setOpen(false);
    toast({
      title: "You deleted your owned item:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(item, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setView("addToKit")}>
              Add to a Kit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setView("edit")}>
              Edit
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(String(item.serialNumber))
            }
          >
            Copy Serial Number
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>Sell</DropdownMenuItem> */}
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setView("delete")}>
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        {view === "delete" && (
          <>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to
                permanently delete this item from your gear bag?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant={"destructive"} onClick={() => onDelete()}>
                Delete
              </Button>
            </DialogFooter>
          </>
        )}
        {view === "addToKit" && (
          <>
            <DialogHeader>
              <DialogTitle>{item.products.name}</DialogTitle>
              <DialogDescription>
                Choose which kit you want to add this item to.
              </DialogDescription>
            </DialogHeader>
            <AddProductToKitForm setOpen={setOpen} product={item.products} />
          </>
        )}
        {view === "edit" && (
          <>
            <DialogHeader>
              <DialogTitle>{item.products.name}</DialogTitle>
              <DialogDescription>
                Edit this product ownership details.
              </DialogDescription>
            </DialogHeader>
            <OwnershipForm
              setOpen={setOpen}
              product={{
                id: item.productId,
              }}
              item={item}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

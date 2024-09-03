"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { KitsWithProductsOnKits } from "@/data/kits";
import { ProductsOnKits } from "@prisma/client";
import { deleteKitItemAction } from "@/app/(dashboard)/kits/actions";
import { toast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { formatWeight, locale } from "@/lib";

// TODO: only pass necessary data to client component
export const DialogKitItems = ({
  kitItems,
}: {
  kitItems: KitsWithProductsOnKits[0]["ProductsOnKits"];
}) => {
  const [open, setOpen] = React.useState(false);
  const [kitItemSelected, setKitItemSelected] =
    React.useState<KitsWithProductsOnKits[0]["ProductsOnKits"][0]>();

  function deleteKitItem(kitItem: ProductsOnKits) {
    console.log(kitItem);
    deleteKitItemAction(kitItem)
      .then((kit) => {
        setOpen(false);
        toast({
          title: "You removed your kit item:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(kit, null, 2)}</code>
            </pre>
          ),
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error remoing kit item",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(err, null, 2)}</code>
            </pre>
          ),
        });
      })
      .finally(() => {});
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {kitItems.length > 0 ? (
        kitItems.map((kitItem) => (
          <div
            key={`${kitItem.kitId}-${kitItem.productId}`}
            className="flex flex-row items-center justify-between text-sm group"
          >
            <div>
              {kitItem.product.name}{" "}
              <span className="text-muted-foreground">
                {" • "}
                {formatWeight(kitItem.product.weight)}
              </span>
            </div>

            <DialogTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setKitItemSelected(kitItem)}
                className="invisible group-hover:visible"
              >
                <span className="sr-only">{`Delete kit item: ${kitItem.product.name}`}</span>
                <X className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">This kit has no items</p>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{kitItemSelected?.product.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this item from your kit?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {kitItemSelected && (
            <Button
              variant={"destructive"}
              onClick={() => deleteKitItem(kitItemSelected)}
            >
              Delete Kit Item
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
DialogKitItems.displayName = "DialogKitItems";

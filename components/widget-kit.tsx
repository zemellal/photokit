"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DropdownDialogKit } from "./dialog-kit";
import { Button } from "./ui/button";
import { X, Plus } from "lucide-react";
import { KitsWithProductsOnKits } from "@/lib/queries/kits";
import { ProductsOnKits } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { toast } from "./ui/use-toast";
import { deleteKitItemAction } from "@/app/kits/actions";

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  kit: KitsWithProductsOnKits[0];
}

const KitWidget = React.forwardRef<HTMLDivElement, WidgetProps>(
  ({ className, kit, ...props }, ref) => {
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
                <code className="text-white">
                  {JSON.stringify(kit, null, 2)}
                </code>
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
                <code className="text-white">
                  {JSON.stringify(err, null, 2)}
                </code>
              </pre>
            ),
          });
        })
        .finally(() => {});
    }

    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{kit.name}</CardTitle>
            <DropdownDialogKit kit={kit} />
          </div>
        </CardHeader>
        <CardContent>
          <Dialog open={open} onOpenChange={setOpen}>
            {kit.ProductsOnKits.length > 0 ? (
              kit.ProductsOnKits.map((kitItem) => (
                <article
                  key={kitItem.productId}
                  className="flex flex-row items-center justify-between"
                >
                  <div>{kitItem.product.name}</div>

                  <DialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => setKitItemSelected(kitItem)}
                    >
                      <span className="sr-only">{`Delete kit item: ${kitItem.product.name}`}</span>
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
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
                </article>
              ))
            ) : (
              <p className="text-muted-foreground">Nothing in this kit</p>
            )}
          </Dialog>
        </CardContent>
        <CardFooter>
          <Button variant={"outline"} size={"icon"}>
            <Plus className="size-5" />
          </Button>
        </CardFooter>
      </Card>
    );
  }
);
KitWidget.displayName = "KitWidget";

export { KitWidget };

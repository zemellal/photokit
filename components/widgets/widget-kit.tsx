import { cn } from "@/lib/utils";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DropdownDialogKit } from "../dialogs/dialog-kit";
import { KitsWithProductsOnKits } from "@/data/kits";
import { formatWeight, locale, sumTotal } from "@/lib";
import { DialogKitItems } from "../dialogs/dialog-kit-items";
import Link from "next/link";

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  kit: KitsWithProductsOnKits[0];
}

const KitWidget = React.forwardRef<HTMLDivElement, WidgetProps>(
  ({ className, kit, ...props }, ref) => {
    /** Extract the weights to an array */
    const weights = kit.productsOnKits.map((a) => a.product.weight || 0);

    const totalWeight = sumTotal(weights);

    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{kit.name}</CardTitle>
            <DropdownDialogKit kit={kit} />
          </div>
          <CardDescription>Weight: {formatWeight(totalWeight)}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <DialogKitItems kitItems={kit.productsOnKits} />
        </CardContent>
        <CardFooter>
          <CardDescription>
            Add to your kit from your{" "}
            <Link className="text-foreground hover:underline" href="/bag">
              gear
            </Link>{" "}
            page
          </CardDescription>

          {/* <Button variant={"outline"} size={"icon"}>
            <Plus className="size-5" />
          </Button> */}
        </CardFooter>
      </Card>
    );
  }
);
KitWidget.displayName = "KitWidget";

export { KitWidget };

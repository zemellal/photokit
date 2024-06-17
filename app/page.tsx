// export const runtime = "edge";

import OwnershipSummaryWidget from "@/components/widget-ownership-summary";
import { SummaryWidget } from "@/components/widget-summary";
import { locale } from "@/lib";
import { getKitCount } from "@/lib/queries/kits";
import { listOwnershipsWithProducts } from "@/lib/queries/ownership";

import { Backpack, DollarSign, Ungroup, Weight } from "lucide-react";

export default async function Home() {
  const ownedProducts = await listOwnershipsWithProducts();
  const kitCount = await getKitCount();

  // sum the total weight of your owned products
  const totalWeight = ownedProducts.reduce((acc, cur) => {
    acc += cur.products?.weight || 0;
    return acc;
  }, 0);
  // sum the cost of all your owned products
  const totalCost = ownedProducts.reduce((acc, cur) => {
    acc += cur.purchased_for || 0;
    return acc;
  }, 0);

  return (
    <div className="main-padded main-col-gap">
      <section className="">
        <h1 className="text-2xl font-medium tracking-tight">PhotoKit</h1>
      </section>

      <section className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <SummaryWidget
            header={"Products Count"}
            icon={<Ungroup className="h-4 w-4 text-muted-foreground" />}
            value={ownedProducts.length}
            description="You own these many items"
          />
          <SummaryWidget
            header={"Kits"}
            icon={<Backpack className="h-4 w-4 text-muted-foreground" />}
            value={kitCount}
            description="Kits you have assembled"
          />
          <SummaryWidget
            header={"Total Weight"}
            icon={<Weight className="h-4 w-4 text-muted-foreground" />}
            value={new Intl.NumberFormat(locale, {
              style: "unit",
              unit: "gram",
              unitDisplay: "short",
            }).format(totalWeight)}
            description="The total weight of your kit"
          />
          <SummaryWidget
            header="Total Cost"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            value={new Intl.NumberFormat(locale, {
              style: "currency",
              currency: "USD",
            }).format(totalCost)}
            description="The total cost of what you paid for your kit"
          />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          <OwnershipSummaryWidget
            className="sm:col-span-2 lg:col-span-2"
            items={ownedProducts}
          />
        </div>
      </section>
    </div>
  );
}

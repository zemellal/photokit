// export const runtime = "edge";

import { OwnershipValueChart } from "@/components/charts/ownership-value";
import LensTypeWidget from "@/components/widget-lens-type";
import OwnershipSummaryWidget from "@/components/widget-ownership-summary";
import { SummaryWidget } from "@/components/widget-summary";
import { formatCurrency, formatWeight, sumTotal } from "@/lib";
import { getKitCount } from "@/lib/queries/kits";
import { listOwnershipsWithProductsLens } from "@/lib/queries/ownership";

import { Backpack, DollarSign, Ungroup, Weight } from "lucide-react";

export default async function Home() {
  const ownedProductsData = listOwnershipsWithProductsLens();
  const kitCountData = getKitCount();

  const [ownedProducts, kitCount] = await Promise.all([
    ownedProductsData,
    kitCountData,
  ]);

  const totalWeight = sumTotal(ownedProducts.map((el) => el.products.weight));
  const totalCost = sumTotal(ownedProducts.map((el) => el.price));
  const totalReplacementCost = sumTotal(
    ownedProducts.map((el) => el.products.price)
  );

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
            href="/bag"
          />
          {/* <SummaryWidget
            header={"Kits"}
            icon={<Backpack className="h-4 w-4 text-muted-foreground" />}
            value={kitCount}
            description="Kits you have assembled"
            href="/kits"
          /> */}
          <SummaryWidget
            header={"Total Weight"}
            icon={<Weight className="h-4 w-4 text-muted-foreground" />}
            value={formatWeight(totalWeight)}
            description="The total weight of your kit"
            href="/bag"
          />
          <SummaryWidget
            header="Total Cost"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            value={formatCurrency(totalCost, { maximumFractionDigits: 0 })}
            description="The total you paid for your kit"
            href="/bag"
          />
          <SummaryWidget
            header="Replacement Cost"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            value={formatCurrency(totalReplacementCost, {
              maximumFractionDigits: 0,
            })}
            description="The new replacement cost of your gear"
            href="/bag"
          />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
          <OwnershipSummaryWidget
            className="sm:col-span-2 md:col-span-1 lg:col-span-4"
            items={ownedProducts}
          />
          <div className="sm:col-span-2 lg:col-span-5">
            <OwnershipValueChart ownershipData={ownedProducts} />
          </div>
          <div className="sm:col-span-3">
            <LensTypeWidget />
          </div>
        </div>
      </section>
    </div>
  );
}

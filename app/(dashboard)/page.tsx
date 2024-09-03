// export const runtime = "edge";

import { OwnershipValueChart } from "@/components/charts/ownership-value";
import { PageTitle } from "@/components/typography";
import { Button } from "@/components/ui/button";
import LensTypeWidget from "@/components/widget-lens-type";
import OwnershipSummaryWidget from "@/components/widget-ownership-summary";
import { SummaryWidget } from "@/components/widget-summary";
import { formatCurrency, formatWeight, sumTotal } from "@/lib";
import { getKitCount } from "@/lib/queries/kits";
import { listOwnershipsWithProductsLens } from "@/lib/queries/ownership";

import { Backpack, DollarSign, Ungroup, Weight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const [ownedProducts, kitCount] = await Promise.all([
    listOwnershipsWithProductsLens(),
    getKitCount(),
  ]);

  const totalWeight = sumTotal(ownedProducts.map((el) => el.products.weight));
  const totalCost = sumTotal(ownedProducts.map((el) => el.price));
  const totalReplacementCost = sumTotal(
    ownedProducts.map((el) => el.products.price)
  );

  return (
    <div className="main-padded main-col-gap">
      <section className="">
        <PageTitle className="text-3xl font-medium">PhotoKit</PageTitle>
      </section>

      <section className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <SummaryWidget
            header={"Products Count"}
            Icon={Ungroup}
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
            Icon={Weight}
            value={formatWeight(totalWeight)}
            description="The total weight of your kit"
            href="/bag"
          />
          <SummaryWidget
            header="Total Cost"
            Icon={DollarSign}
            value={formatCurrency(totalCost, { maximumFractionDigits: 0 })}
            description="The total you paid for your kit"
            href="/bag"
          />
          <SummaryWidget
            header="Replacement Cost"
            Icon={DollarSign}
            value={formatCurrency(totalReplacementCost, {
              maximumFractionDigits: 0,
            })}
            description="The new replacement cost of your gear"
            href="/bag"
          />
        </div>
      </section>

      {ownedProducts.length > 0 ? (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
            <div className="sm:col-span-2 md:col-span-1 lg:col-span-4">
              <div className="grid auto-rows-auto grid-flow-row gap-4 lg:gap-6">
                <OwnershipSummaryWidget items={ownedProducts} />
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-5">
              <div className="grid auto-rows-auto  grid-flow-row gap-4 lg:gap-6">
                <OwnershipValueChart ownershipData={ownedProducts} />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="grid auto-rows-auto grid-flow-row gap-4 lg:gap-6">
                <LensTypeWidget />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <p className="text-base align-baseline">
            Add gear that you own from the{" "}
            <Button
              className="px-0 py-0 text-base align-baseline"
              variant={"link"}
              asChild
            >
              <Link href={"/browse"}>browse</Link>
            </Button>{" "}
            products page.
          </p>
        </section>
      )}
    </div>
  );
}

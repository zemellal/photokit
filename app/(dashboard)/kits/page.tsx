import { DialogKit } from "@/components/dialogs/dialog-kit";
import { PageTitle } from "@/components/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KitWidget } from "@/components/widget-kit";

import { getKitsWithProductsOnKits } from "@/data/kits";

export default async function KitPage() {
  const kits = await getKitsWithProductsOnKits();
  // const gear = await listOwnershipsWithProductsLens();

  // const ownedLenses = gear.filter((item) => item.products.type === "lens");
  // const ownedCameras = gear.filter((item) => item.products.type === "camera");

  // ownedLenses.sort(
  //   (a, b) => (a.products.lens?.minFl || 0) - (b.products.lens?.minFl || 0)
  // );
  // ownedCameras.sort(
  //   (a, b) => (a.products.price || 0) - (b.products.price || 0)
  // );

  // const ownedGearGroups = [
  //   { type: "lens", name: "Lenses", items: ownedLenses },
  //   { type: "camera", name: "Cameras", items: ownedCameras },
  // ];

  return (
    <div className="main-padded">
      <section className="flex flex-col gap-y-4">
        <div className="flex flex-row items-center justify-between">
          <PageTitle>Kits</PageTitle>
          <DialogKit action={"new"} />
        </div>
        {kits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
            {kits.map((kit) => (
              <KitWidget kit={kit} key={kit.id} className="" />
            ))}
          </div>
        ) : (
          <div className="grid place-content-center min-h-64 w-full">
            <Card className="flex flex-col w-64 gap-4 place-items-center">
              <CardHeader className=" text-center">
                <CardTitle className="">No Kits</CardTitle>
                <CardDescription>Add a new Kit</CardDescription>
              </CardHeader>
              <CardFooter>
                <DialogKit action={"new"} />
              </CardFooter>
            </Card>
          </div>
        )}

        {/* {ownedGearGroups.map((gearGroup) => (
          <section key={gearGroup.type} className="flex flex-col">
            <h2 className="py-2 font-medium">{gearGroup.name}</h2>

            <div className="flex flex-row flex-wrap gap-4">
              {gearGroup.items.map((ownedLens) => (
                <Card key={ownedLens.id} className="w-64 flex flex-col">
                  <CardHeader>
                    <CardTitle>{ownedLens.products.name}</CardTitle>
                    <CardDescription>
                      {formatUnit(ownedLens.products.weight, { unit: "gram" })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {ownedLens.products.lens?.maxAperture}
                    {ownedLens.products.camera?.megapixels}
                  </CardContent>
                  <CardFooter>{ownedLens.serialNumber}</CardFooter>
                </Card>
              ))}
            </div>
          </section>
        ))} */}
      </section>
    </div>
  );
}

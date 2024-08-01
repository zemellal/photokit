import { DialogKit } from "@/components/dialogs/dialog-kit";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KitWidget } from "@/components/widget-kit";

import { getKitsWithProductsOnKits } from "@/lib/queries/kits";

export default async function KitPage() {
  const kits = await getKitsWithProductsOnKits();

  return (
    <div className="main-padded">
      <section className="flex flex-col gap-y-4">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-medium tracking-tight">Kits</h1>
          <DialogKit action={"new"} />
        </div>
        {kits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {kits.map((kit) => (
              <KitWidget
                kit={kit}
                key={kit.id}
                className="col-span-1 lg:col-span-2"
              />
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
      </section>
    </div>
  );
}

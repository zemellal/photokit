import { DataTable } from "@/components/data-table";
import { columnsBag } from "./columns-bag";
import { listOwnershipsWithProducts } from "@/lib/queries/ownership";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function BagPage() {
  const ownedProducts = await listOwnershipsWithProducts();
  return (
    <div className="main-padded">
      <section>
        {/* <h1 className="text-2xl font-medium tracking-tight">My Gear</h1> */}
        <Card className="px-6 py-2 mt-4">
          <CardHeader>
            <CardTitle className="text-base">My Gear</CardTitle>
            <CardDescription>All of the gear that you own</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columnsBag} data={ownedProducts} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

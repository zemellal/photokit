import { DataTable } from "@/components/table/data-table";
import { columnsBag } from "./columns-bag";
import { listOwnershipsWithProducts } from "@/data/ownership";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader, PageTitle } from "@/components/headings";

export default async function BagPage() {
  const ownedProducts = await listOwnershipsWithProducts();
  return (
    <div className="main-padded">
      <section className="flex flex-col gap-y-4">
        <PageHeader>
          <PageTitle>My Gear</PageTitle>
        </PageHeader>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ownership List</CardTitle>
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

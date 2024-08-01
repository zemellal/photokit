import { getProducts } from "@/lib/queries/products";
import { DataTable } from "../../components/data-table";
import { columnsProducts } from "./columns-browse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function BrowsePage() {
  const products = await getProducts();

  return (
    <div className="main-padded">
      <section className="">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-base">Browse Products</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columnsProducts} data={products} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

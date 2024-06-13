import { getProductsWithBrands } from "@/lib/queries/products";
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
  const products = await getProductsWithBrands();

  return (
    <div className="main-padded">
      <section className="">
        {/* <h1 className="text-2xl font-medium tracking-tight">Browse</h1> */}

        <Card className="px-6 py-2 mt-4">
          <CardHeader>
            <CardTitle className="text-base">Browse All Products</CardTitle>
            <CardDescription>Add to your bag or wishlist</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columnsProducts} data={products} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

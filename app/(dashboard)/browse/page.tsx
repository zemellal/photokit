import { getProducts } from "@/data/products";
import { DataTable } from "@/components/table/data-table";
import { columnsProducts } from "./columns-browse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageTitle } from "@/components/typography";
import { PageHeader } from "@/components/heading";

export default async function BrowsePage() {
  const products = await getProducts();

  return (
    <div className="main-padded">
      <section className="flex flex-col gap-y-4">
        <PageHeader>
          <PageTitle>Browse Products</PageTitle>

          <Button size={"sm"} asChild>
            <Link href="/product/add">Add Product</Link>
          </Button>
        </PageHeader>
        <Card className="">
          {/* <CardHeader>
            <CardTitle className="text-base">Browse Products</CardTitle>
          </CardHeader> */}
          <CardContent>
            <DataTable columns={columnsProducts} data={products} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

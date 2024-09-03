import { ProductForm } from "@/components/form/form-product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCachedBrands, getCachedMounts } from "@/data/products";

export default async function AddProduct() {
  const [brands, mounts] = await Promise.all([
    getCachedBrands(),
    getCachedMounts(),
  ]);

  return (
    <div className="container py-6">
      {/* <div className="flex flex-row gap-4 items-center">
        <h1 className="text-xl tracking-tight font-semibold whitespace-nowrap">
          Add a Product
        </h1>
      </div> */}
      {/* Form */}
      <div className="max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Add a Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm brands={brands} mounts={mounts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

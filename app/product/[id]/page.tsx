import { DialogProductItem } from "@/components/dialogs/dialog-product-item";
import { SpecsTable } from "@/components/table-specs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatDate, formatUnit, locale } from "@/lib";
import { findOwnershipByProductId } from "@/lib/queries/ownership";
import { getProductWithDetailsById } from "@/lib/queries/products";
import { ChevronLeft } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const pid = decodeURI(params.id);
  const productData = getProductWithDetailsById(pid);
  const ownershipData = findOwnershipByProductId(pid);

  const [product, ownership] = await Promise.all([productData, ownershipData]);

  const generalSpecsData = [
    { label: "Price", value: formatCurrency(product.price) },
    { label: "Brand", value: product.Brand.name },
    { label: "Weight", value: formatUnit(product.weight, { unit: "gram" }) },
    {
      label: "Announced",
      value: formatDate(product.releaseDate, { dateStyle: "long" }),
    },
  ];

  let detailedSpecsData;
  if (product.type === "lens" && product.lens) {
    detailedSpecsData = [
      {
        label: "Focal length",
        value: formatUnit(product.lens.minFl, { unit: "millimeter" }),
      },
      { label: "Speed", value: `f/${product.lens.maxAperture}` },
      {
        label: "Entrance Pupil",
        value: formatUnit(
          Math.round(
            (product.lens.maxFl || product.lens.minFl) /
              product.lens.maxAperture
          ),
          { unit: "millimeter" }
        ),
      },
      { label: "Mount", value: product.lens.mounts.name },
      { label: "Filter Thread", value: product.lens.filterThread },
    ];
  } else if (product.type === "camera" && product.camera) {
    detailedSpecsData = [
      { label: "Megapixels", value: product.camera.megapixels },
      { label: "Crop Factor", value: product.camera.cropFactor },
    ];
  }

  return (
    <div className="container py-6">
      <article className="grid gap-4 md:gap-8">
        {/* <section>
          <p>Params: {params.slug}</p>
          <p>Decoded: {pid}</p>
        </section> */}

        <div className="flex flex-row gap-4 items-center">
          {/* TODO: make this a "back" button ? */}
          <Button variant={"outline"} size={"icon"} className="size-8">
            <ChevronLeft className="size-5" />
          </Button>
          <h1 className="text-xl tracking-tight font-semibold whitespace-nowrap">
            {product.name}
          </h1>
          {ownership.length > 0 && <Badge className="select-none">Owned</Badge>}
        </div>

        <div className="grid grid-flow-row-dense gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-6 xl:gap-8">
          {/* General product info card */}
          <Card className="col-span-1 xl:col-span-4">
            <CardHeader>
              <CardTitle className="text-base">Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <SpecsTable data={generalSpecsData} />
            </CardContent>
          </Card>

          {/* Ownership card */}
          <Card className="cols-span-1 xl:col-span-2 ">
            <CardHeader>
              <CardTitle className="text-base">Ownership</CardTitle>
              <CardDescription>
                {ownership.length > 0
                  ? "You own this product"
                  : "You do not currently own this product"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ownership.length > 0 ? (
                <>
                  {ownership.map((ownedItem) => (
                    <SpecsTable
                      key={ownedItem.id}
                      data={[
                        {
                          label: "Purchased For",
                          value: formatCurrency(ownedItem.price),
                        },
                        {
                          label: "Purchased On",
                          value: formatDate(ownedItem.purchaseDate),
                        },
                        {
                          label: "Condition",
                          value: ownedItem.itemCondition?.replace(
                            /Condition$/,
                            ""
                          ),
                        },
                      ]}
                      caption={`Serial Number: ${ownedItem.serialNumber}`}
                    />
                  ))}
                </>
              ) : (
                <DialogProductItem product={product}>
                  <Button>Add to Bag</Button>
                </DialogProductItem>
              )}
            </CardContent>
          </Card>

          {/* Price history card */}
          <Card className="col-span-1 md:col-span-2 xl:col-span-4">
            <CardHeader>
              <CardTitle className="text-base">Price History</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>

          {/* Specs details card */}
          {detailedSpecsData && (
            <Card className="col-span-1 xl:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Specs</CardTitle>
              </CardHeader>
              <CardContent>
                {product.type === "lens" && (
                  <SpecsTable
                    data={detailedSpecsData}
                    caption={"Optical Design"}
                  />
                )}
                {product.type === "camera" && (
                  <SpecsTable
                    data={detailedSpecsData}
                    caption="Camera Details"
                  />
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </article>
    </div>
  );
}

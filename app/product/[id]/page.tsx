import { DialogProductItem } from "@/components/dialogs/dialog-product-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableCaption,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatWeight, locale } from "@/lib";
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

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  {/* <TableCaption>Product</TableCaption> */}
                  <TableBody>
                    {product.price && (
                      <TableRow>
                        <TableCell className="font-medium text-right  w-[50%]">
                          Price
                        </TableCell>
                        <TableCell className="">
                          {formatCurrency(product.price)}
                        </TableCell>
                      </TableRow>
                    )}

                    <TableRow>
                      <TableCell className="font-medium text-right  w-[50%]">
                        Brand
                      </TableCell>
                      <TableCell className="">{product.Brand.name}</TableCell>
                    </TableRow>
                    {product.weight && (
                      <TableRow>
                        <TableCell className="font-medium text-right">
                          Weight
                        </TableCell>
                        <TableCell className="">
                          {formatWeight(product.weight)}
                        </TableCell>
                      </TableRow>
                    )}

                    {product.releaseDate && (
                      <TableRow>
                        <TableCell className="font-medium text-right">
                          Announced
                        </TableCell>
                        <TableCell className="">
                          {new Intl.DateTimeFormat(locale, {
                            dateStyle: "long",
                          }).format(product.releaseDate)}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Specs</CardTitle>
              </CardHeader>
              <CardContent>
                {product.type === "lens" && product.lens && (
                  <Table>
                    <TableCaption>Optical Design</TableCaption>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-right w-[50%]">
                          Focal length
                        </TableCell>
                        <TableCell className="">
                          {new Intl.NumberFormat(locale, {
                            style: "unit",
                            unit: "millimeter",
                            unitDisplay: "short",
                          }).format(product.lens.minFl)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-right">
                          Speed
                        </TableCell>
                        <TableCell className="">
                          {`f/${product.lens.maxAperture}`}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-right">
                          Mount
                        </TableCell>
                        <TableCell className="">
                          {product.lens.mounts.name}
                        </TableCell>
                      </TableRow>
                      {product.lens.filterThread && (
                        <TableRow>
                          <TableCell className="font-medium text-right">
                            Filter thread
                          </TableCell>
                          <TableCell className="">
                            {new Intl.NumberFormat(locale, {
                              style: "unit",
                              unit: "millimeter",
                              unitDisplay: "short",
                            }).format(product.lens.filterThread)}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
                {product.type === "camera" && product.camera && (
                  <Table>
                    <TableCaption>Camera Details</TableCaption>
                    <TableBody>
                      {product.camera.megapixels && (
                        <TableRow>
                          <TableCell className="font-medium text-right w-[50%]">
                            Megapixels
                          </TableCell>
                          <TableCell className="">
                            {product.camera.megapixels}
                          </TableCell>
                        </TableRow>
                      )}
                      {product.camera.cropFactor && (
                        <TableRow>
                          <TableCell className="font-medium text-right w-[50%]">
                            Crop Factor
                          </TableCell>
                          <TableCell className="">
                            {product.camera.cropFactor}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Price History</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>

          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
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
                      <Table key={ownedItem.id}>
                        <TableCaption>
                          Serial Number: {ownedItem.serialNumber}
                        </TableCaption>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-right w-[50%]">
                              Purchased For
                            </TableCell>
                            <TableCell className="">
                              {formatCurrency(ownedItem.price)}
                            </TableCell>
                          </TableRow>

                          {ownedItem.purchaseDate && (
                            <TableRow>
                              <TableCell className="font-medium text-right">
                                Purchased On
                              </TableCell>
                              <TableCell className="">
                                {new Intl.DateTimeFormat(locale, {
                                  dateStyle: "long",
                                }).format(ownedItem.purchaseDate)}
                              </TableCell>
                            </TableRow>
                          )}

                          <TableRow>
                            <TableCell className="font-medium text-right w-[50%]">
                              Condition
                            </TableCell>
                            <TableCell>
                              {ownedItem.itemCondition?.replace(
                                /Condition$/,
                                ""
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    ))}
                  </>
                ) : (
                  <DialogProductItem product={product}>
                    <Button>Add to Bag</Button>
                  </DialogProductItem>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </article>
    </div>
  );
}

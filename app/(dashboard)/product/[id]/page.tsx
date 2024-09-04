import { BackButton } from "@/components/button-back";
import { DialogOpen } from "@/components/dialogs/dialog-open";
import { DialogProductItem } from "@/components/dialogs/dialog-product-item";
import { OfferForm } from "@/components/form/form-offer";
import { SpecsTable } from "@/components/table/table-specs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatCurrency, formatDate, formatUnit } from "@/lib";
import { getProductWithDetailsById } from "@/data/products";
import { PageHeader, PageTitle } from "@/components/headings";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const pid = decodeURI(params.id);

  const product = await getProductWithDetailsById(pid);

  if (!product) return <div className="container py-6">Product Not Found</div>;

  const ownerships = product.ownership;
  const offers = product.Offer;

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
    <div className="main-padded">
      <article className="grid gap-4 md:gap-8">
        {/* <section>
          <p>Params: {params.slug}</p>
          <p>Decoded: {pid}</p>
        </section> */}

        <PageHeader>
          <div className="flex flex-row gap-4 items-center">
            <BackButton />
            <PageTitle className="">{product.name}</PageTitle>
            {ownerships.length > 0 && (
              <Badge className="select-none">Owned</Badge>
            )}
          </div>
        </PageHeader>

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
                {ownerships.length > 0
                  ? "You own this product"
                  : "You do not currently own this product"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ownerships.length > 0 ? (
                <>
                  {ownerships.map((ownedItem) => (
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
          {/* <ProductOffersWidget
            offers={offers}
            className="col-span-1 md:col-span-2 xl:col-span-4"
          /> */}
          <Card className="col-span-1 md:col-span-2 xl:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Price History</CardTitle>
                <CardDescription>
                  Historical price data points for new and used values
                </CardDescription>
              </div>
              {/* <DialogOffer productId={pid} /> */}
              <DialogOpen
                trigger={<Button size={"sm"}>Add Price Point</Button>}
                header={{
                  title: "Price Data Point",
                  description:
                    "Add a new price data point for this product to keep a history of new and used prices.",
                }}
              >
                <OfferForm productId={pid} />
              </DialogOpen>
            </CardHeader>
            <CardContent>
              {offers && (
                <ul>
                  {offers.map((offer) => (
                    <li key={String(offer.date)}>{` ${formatDate(
                      offer.date
                    )} - ${formatCurrency(offer.price)} - ${
                      offer.itemCondition
                    }`}</li>
                  ))}
                </ul>
              )}
            </CardContent>
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

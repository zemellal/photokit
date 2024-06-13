import prisma from "../prismaClient";

export function getProductsWithBrands() {
  const products = prisma.product.findMany({
    include: { brands: true },
    orderBy: [{ date_announced: "desc" }],
  });
  return products;
}

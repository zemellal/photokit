import { cache } from "react";
import "server-only";

import { Product } from "@prisma/client";
import prisma from "../prismaClient";

export const getProductsWithBrands = cache(() => {
  console.log("getProductsWithBrands");
  const products = prisma.product.findMany({
    include: { brands: true },
    orderBy: [{ date_announced: "desc" }],
  });
  return products;
});

export const getProductWithDetailsById = cache((id: Product["id"]) => {
  console.log(`getProductWithDetailsById: ${id}`);
  const product = prisma.product.findUniqueOrThrow({
    where: { id },
    include: {
      brands: true,
      lens: { include: { mounts: true } },
      camera: { include: { mounts: true } },
    },
  });
  return product;
});

export const getProductWithBrandsByName = cache((name: Product["name"]) => {
  console.log(`getProductWithBrandsByName: ${name}`);
  const product = prisma.product.findUniqueOrThrow({ where: { name } });
  return product;
});

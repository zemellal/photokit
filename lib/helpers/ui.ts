import { BadgeProps } from "@/components/ui/badge";
import { ItemCondition, ProductType } from "../types";

/**
 * UI Helpers
 * */

/**
 * Returns the badge variant style for the type value passed in.
 *
 * @param prop enum type
 * @returns the badge variant
 */
export const badgeVariantByType = (prop: string): BadgeProps["variant"] => {
  let variant: BadgeProps["variant"];
  if (Object.values(ItemCondition).includes(prop as ItemCondition)) {
    switch (prop as ItemCondition) {
      case "NewCondition":
        variant = "default";
        break;

      default:
        variant = "outline";
        break;
    }
  } else if (Object.values(ProductType).includes(prop as ProductType)) {
    switch (prop as ProductType) {
      case "lens":
        variant = "default";
        break;
      case "camera":
        variant = "secondary";
        break;
      default:
        variant = "outline";
        break;
    }
  }

  return variant || "default";
};

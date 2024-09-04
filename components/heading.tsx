import { cn } from "@/lib/utils";
import React from "react";

const PageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn("flex flex-row items-center justify-between", className)}
    {...props}
  />
));
PageHeader.displayName = "PageHeader";

export { PageHeader };

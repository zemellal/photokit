"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const BackButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => {
    const router = useRouter();

    return (
      <Button
        ref={ref}
        variant={variant || "outline"}
        size={size || "icon"}
        className={cn("size-8", className)}
        {...props}
        onClick={() => router.back()}
      >
        <ChevronLeft className="size-5" />
        <span className="sr-only">Back to previous page</span>
      </Button>
    );
  }
);
BackButton.displayName = "BackButton";

export { BackButton };

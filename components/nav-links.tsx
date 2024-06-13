"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
  path: string;
  label: string;
}

export function NavLink({ path, label, ...props }: PropsWithChildren<Props>) {
  const pathname = usePathname();
  const isActive = pathname === path;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={path}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
            isActive
              ? "bg-accent text-accent-foreground "
              : "text-muted-foreground"
          )}
        >
          {props.children}
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

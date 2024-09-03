"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface DialogProps extends React.PropsWithChildren {
  trigger: React.ReactNode;
  header: { title: string; description?: string };
}

export const DialogOpenContext = React.createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

export function DialogOpen({
  trigger,
  header: { title, description },
  children,
}: DialogProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogOpenContext.Provider value={setOpen}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogOpenContext.Provider>
      </DialogContent>
    </Dialog>
  );
}

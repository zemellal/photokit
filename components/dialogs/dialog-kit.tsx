"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { KitForm } from "@/components/form/form-kit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Kit } from "@prisma/client";
import { deleteKitAction } from "@/app/(dashboard)/kits/actions";
import { toast } from "@/components/ui/use-toast";

// TODO: pass in JSX child for Dialog Trigger ??
// TODO: only pass necessary data to client component
export const DialogKit = ({ action }: { action: "new" }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="">
          New Kit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Kit</DialogTitle>
          <DialogDescription>
            You can then add any product to assemble your kit
          </DialogDescription>
        </DialogHeader>
        <KitForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
DialogKit.displayName = "DialogKit";

export const DropdownDialogKit = ({ kit }: { kit: Kit }) => {
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState<"delete" | "edit" | "">("");

  function deleteKit() {
    console.log(`kitId: ${kit.id}`);
    deleteKitAction(kit.id)
      .then((kit) => {
        setOpen(false);
        toast({
          title: "You deleted your kit:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(kit, null, 2)}</code>
            </pre>
          ),
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error deleting kit",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(err, null, 2)}</code>
            </pre>
          ),
        });
      })
      .finally(() => {});
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Kit actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setAction("edit")}>
              Edit
            </DropdownMenuItem>
          </DialogTrigger>

          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setAction("delete")}>
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {action === "delete" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your kit? This cannot be undone
              and will also delete all the items inside the kit.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={"destructive"} onClick={() => deleteKit()}>
              Delete Kit
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
      {action === "edit" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
            <DialogDescription>Edit the kit</DialogDescription>
          </DialogHeader>
          <KitForm setOpen={setOpen} kit={kit} />
        </DialogContent>
      )}
    </Dialog>
  );
};
DropdownDialogKit.displayName = "DropdownDialogKit";

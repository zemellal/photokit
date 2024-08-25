"use client";

import { Dispatch } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Kit, Prisma } from "@prisma/client";
import { createKitAction, editKitAction } from "@/app/(dashboard)/kits/actions";

const KitFormSchema = z.object({
  name: z.string().min(3).trim(),
}) satisfies z.Schema<Prisma.KitUncheckedCreateWithoutOwnerInput>;

export function KitForm({
  setOpen,
  kit,
}: {
  setOpen: Dispatch<boolean>;
  kit?: Kit;
}) {
  const safeKit = KitFormSchema.safeParse(kit);
  const form = useForm<z.infer<typeof KitFormSchema>>({
    resolver: zodResolver(KitFormSchema),
    defaultValues: {
      name: safeKit.data?.name,
    },
  });

  function onSubmit(data: z.infer<typeof KitFormSchema>) {
    // kit id found, so edit the kit
    if (kit?.id) {
      editKitAction(kit.id, data)
        .then((kitData) => {
          setOpen(false);
          toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(data, null, 2)}
                </code>
              </pre>
            ),
          });
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Error editing kit",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(err, null, 2)}
                </code>
              </pre>
            ),
          });
        })
        .finally(() => {});
    }
    // kit id not found, create a new kit
    else {
      createKitAction(data)
        .then((kitData) => {
          setOpen(false);
          toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(data, null, 2)}
                </code>
              </pre>
            ),
          });
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Error creating kit",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(err, null, 2)}
                </code>
              </pre>
            ),
          });
        })
        .finally(() => {});
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kit Name</FormLabel>
              <FormControl>
                <Input placeholder="Light Travel" {...field} />
              </FormControl>
              <FormDescription>Name your kit!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6">
          <Button className="w-full" type="submit">
            {kit ? "Edit Kit" : "Create Kit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

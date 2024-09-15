"use client";

import { Dispatch, useState } from "react";
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
import { Kit } from "@prisma/client";
import { createKitAction, editKitAction } from "@/app/(dashboard)/kits/actions";
import { KitCreateSchema } from "@/lib/zod";

// TODO: only pass necessary data to client component
export function KitForm({
  setOpen,
  kit,
}: {
  setOpen: Dispatch<boolean>;
  kit?: Kit;
}) {
  const safeKit = KitCreateSchema.safeParse(kit);
  const form = useForm<z.infer<typeof KitCreateSchema>>({
    resolver: zodResolver(KitCreateSchema),
    defaultValues: {
      name: safeKit.data?.name,
    },
  });

  /**
   * Submit the kit form. If the input includes a kit id, then it updates the kit. Otherwise it creates a new kit.
   * @param data Kit Form
   */
  const onSubmit = async (data: z.infer<typeof KitCreateSchema>) => {
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
  };

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
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {kit ? "Edit Kit" : "Create Kit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

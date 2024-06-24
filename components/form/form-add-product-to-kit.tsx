"use client";

import { Dispatch, useEffect, useState } from "react";
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
import { Prisma, Product, Kit } from "@prisma/client";
import { addProductToKitAction, getKitsAction } from "@/app/kits/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import { getKits } from "@/lib/queries/kits";

const FormInput = z.object({
  kitId: z.string(),
  productId: z.string(),
}) satisfies z.Schema<Prisma.ProductsOnKitsUncheckedCreateInput>;

export function AddProductToKitForm({
  setOpen,
  product,
}: {
  setOpen: Dispatch<boolean>;
  product: Product;
}) {
  const [kits, setKits] = useState<Kit[]>();
  function getKits() {
    getKitsAction()
      .then((data) => {
        setKits(data);
      })
      .catch((err) => {
        console.log("error getting kits");
      })
      .finally(() => {});
  }

  // Todo: convert this to a server component?
  useEffect(() => {
    getKits();
  }, []);

  const form = useForm<z.infer<typeof FormInput>>({
    resolver: zodResolver(FormInput),
    defaultValues: {
      productId: product.id,
    },
  });

  function onSubmit(data: z.infer<typeof FormInput>) {
    addProductToKitAction(data)
      .then((kit) => {
        setOpen(false);
        toast({
          title: "You added this product to your kit:",
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
          title: "Error adding product to kit",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="kitId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kit Name</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select kit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {kits &&
                    kits.map((kit) => (
                      <SelectItem key={kit.id} value={kit.id}>
                        {kit.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose from your available kits. If you need to create a new
                Kit, go to your{" "}
                <Link
                  className="text-foreground hover:underline"
                  href={"/kits"}
                >
                  Kits
                </Link>{" "}
                page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6">
          <Button className="w-full" type="submit">
            Add to Kit
          </Button>
        </div>
      </form>
    </Form>
  );
}

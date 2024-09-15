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
import { Product, Kit } from "@prisma/client";
import {
  createKitItemAction,
  getKitsAction,
} from "@/app/(dashboard)/kits/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import { ProductsOnKitsSchema } from "@/lib/zod/kits";

// TODO: only pass necessary data to client component
export function AddProductToKitForm({
  setOpen,
  product,
}: {
  setOpen: Dispatch<boolean>;
  product: Product;
}) {
  const [kits, setKits] = useState<Kit[]>();
  const getKits = async () => {
    getKitsAction()
      .then((data) => {
        setKits(data);
      })
      .catch((err) => {
        console.log("error getting kits: ", err);
      })
      .finally(() => {});
  };

  /** @todo convert this to a server component? */
  useEffect(() => {
    getKits();
  }, []);

  const form = useForm<z.infer<typeof ProductsOnKitsSchema>>({
    resolver: zodResolver(ProductsOnKitsSchema),
    defaultValues: {
      productId: product.id,
    },
  });

  /**
   * Submits the kit entry form, productId on kitId
   * @param data
   */
  const onSubmit = async (data: z.infer<typeof ProductsOnKitsSchema>) => {
    createKitItemAction(data)
      .then((data) => {
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
  };

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
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Add to Kit
          </Button>
        </div>
      </form>
    </Form>
  );
}

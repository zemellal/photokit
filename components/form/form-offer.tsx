"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { OfferCreateSchema } from "@/lib/zod/offer";
import { Product } from "@prisma/client";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { ItemCondition } from "@/lib/types";
import { Button } from "../ui/button";
import { Dispatch, useContext, useState } from "react";
import { createOfferAction } from "@/app/(dashboard)/product/actions";
import { toast } from "../ui/use-toast";
import { DialogOpenContext } from "../dialogs/dialog-open";

export function OfferForm({ productId }: { productId: Product["id"] }) {
  const setOpen = useContext(DialogOpenContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof OfferCreateSchema>>({
    resolver: zodResolver(OfferCreateSchema),
    defaultValues: {
      productId: productId,
    },
  });

  function onSubmit(data: z.infer<typeof OfferCreateSchema>) {
    setIsSubmitting(true);
    try {
      createOfferAction(data)
        .then((offerData) => {
          if (setOpen) setOpen(false);

          setIsSubmitting(false);
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
          setIsSubmitting(false);
          toast({
            variant: "destructive",
            title: "Error creating product offer",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(err, null, 2)}
                </code>
              </pre>
            ),
          });
        });
    } catch (err) {
      setIsSubmitting(false);
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="$" {...field} />
              </FormControl>
              <FormDescription>{"The offer price in USD"}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemCondition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(ItemCondition).map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition.replace(/Condition$/, "")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The condition of the product offered
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6">
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Add price data point
          </Button>
        </div>
      </form>
    </Form>
  );
}

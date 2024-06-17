"use client";

import { Dispatch } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createOwnershipAction } from "@/app/bag/actions";
import { OwnershipWithProducts } from "@/lib/queries/ownership";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// TODO:  get the enum from Prisma
const CONDITION = ["new", "refurbished", "used"] as const;
const ConditionEnum = z.enum(CONDITION);

const FormSchema = z.object({
  product_id: z.string(),
  // user_id: z.string(),
  serial_number: z.optional(
    z
      .string({
        invalid_type_error: "Invalid serial number format",
      })
      .min(3)
      .trim()
  ),
  purchased_on: z.optional(
    z.date({
      // required_error: "A date of purchase is required",
    })
  ),
  condition: z.enum(CONDITION),
  purchased_for: z.string().transform((val, ctx) => {
    const parsed = parseFloat(val);
    if (isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not a number",
      });
      return z.NEVER;
    }
    return parsed;
  }),
});

export function OwnershipForm({
  product,
  item,
  setOpen,
}: {
  product: { id: string };
  item?: OwnershipWithProducts;
  setOpen: Dispatch<boolean>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      product_id: product.id,
      // user_id: "g9om23d7o0rdpigl81e2tl50",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createOwnershipAction(data);
    setOpen(false);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="purchased_on"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Item Purchased On</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serial_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} />
              </FormControl>
              <FormDescription>
                The unique serial number that is on your cool item
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchased_for"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="$" {...field} />
              </FormControl>
              <FormDescription>
                {"The price you paid for your cool piece of gear! (with tax)"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="condition"
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
                  {Object.keys(ConditionEnum.Values).map((condition) => (
                    <SelectItem
                      key={condition}
                      className="capitalize"
                      value={condition}
                    >
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The condition of the product you purchased
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6">
          <Button className="w-full" type="submit">
            Add Item
          </Button>
        </div>
      </form>
    </Form>
  );
}

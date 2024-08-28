"use client";
import { useRouter } from "next/navigation";

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
import { Brand, Mount, Prisma } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { createProductAction } from "@/app/(dashboard)/product/add/actions";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { LensType, ProductType } from "@/lib/types";
import { useState } from "react";

const lensSchema = z.object({
  mountId: z.number(),
  type: z.nativeEnum(LensType),
  minFl: z.coerce
    .number({ required_error: "Focal length is required" })
    .positive(),
  maxAperture: z.coerce
    .number({
      required_error: "Maximum aperture is required",
    })
    .positive(),
  maxFl: z.optional(z.coerce.number().positive()),
  filterThread: z.optional(z.coerce.number().positive()),
}) satisfies z.Schema<Prisma.LensUncheckedCreateWithoutProductsInput>;

const cameraSchema = z.object({
  mountId: z.number(),
  megapixels: z.coerce.number().positive().optional(),
  cropFactor: z.coerce.number().positive().optional(),
}) satisfies z.Schema<Prisma.CameraUncheckedCreateWithoutProductsInput>;

const lensProductSchema = z.object({
  type: z.literal(ProductType.lens),
  lensData: lensSchema,
});
const cameraProductSchema = z.object({
  type: z.literal(ProductType.camera),
  cameraData: cameraSchema,
});
const accessoryProductSchema = z.object({
  type: z.literal(ProductType.accessory),
});

const schemaConditions = z.discriminatedUnion("type", [
  lensProductSchema,
  cameraProductSchema,
  accessoryProductSchema,
]);

const productBaseSchema = z.object({
  name: z.string({ required_error: "Please name your item" }),
  type: z.nativeEnum(ProductType),
  brandId: z.number({ required_error: "Brand is required for product" }),
  price: z.coerce.number().optional(),
  weight: z.coerce.number().positive().int().optional(),
  releaseDate: z.date().optional(),
}) satisfies z.Schema<Prisma.ProductUncheckedCreateInput>;

const FormInput = z.intersection(schemaConditions, productBaseSchema);

export function ProductForm({
  brands,
  mounts,
}: {
  brands: Brand[];
  mounts: Mount[];
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormInput>>({
    resolver: zodResolver(FormInput),
    defaultValues: {},
  });
  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormInput>) {
    setLoading(true);
    let subData: Prisma.ProductUncheckedCreateInput;

    //  for lens or camera data payloads, it structures the data for
    //  prisma create nested write for lens, camera
    switch (data.type) {
      case "lens":
        const { lensData, ...ommitLensData } = data;
        subData = {
          ...ommitLensData,
        };
        subData.lens = { create: lensData };
        break;

      case "camera":
        const { cameraData, ...ommitCameraData } = data;
        subData = {
          ...ommitCameraData,
        };
        subData.camera = { create: cameraData };
        break;

      default:
        subData = {
          ...data,
        };
        break;
    }

    createProductAction(subData)
      .then((data) => {
        toast({
          title: "You created this new product:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(subData, null, 2)}
              </code>
            </pre>
          ),
        });
        // router.push("/browse");
      })
      .catch((err) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error creating product",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white text-wrap">
                {JSON.stringify(err, null, 2)}
              </code>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Name of the product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Brand combo-box. Displays the brand name, and uses the brand id as the field value */}
        <FormField
          control={form.control}
          name="brandId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Brand</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? brands.find((brand) => brand.id === field.value)?.name
                        : "Select brand"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search brand..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No brand found.</CommandEmpty>
                      <CommandGroup>
                        {brands.map((brand) => (
                          <CommandItem
                            value={brand.name}
                            key={brand.id}
                            onSelect={() => {
                              form.setValue("brandId", brand.id);
                            }}
                          >
                            {brand.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                brand.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>The brand for the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Release Date</FormLabel>
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="$" {...field} />
              </FormControl>
              <FormDescription>{"The new street price"}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                {"The weight of the product in grams. If applicable."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(ProductType).map((productType) => (
                    <SelectItem
                      className="capitalize"
                      key={productType}
                      value={productType}
                    >
                      {productType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>The product type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 
          Lens type only fields 
        */}
        {form.watch("type") === "lens" && (
          <>
            <h2>Lens Details</h2>
            {/* Lens mount combo-box. Displays the lens mount name, and uses the mountId as the field value */}
            <FormField
              control={form.control}
              name="lensData.mountId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Lens Mount</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? mounts.find((mount) => mount.id === field.value)
                                ?.name
                            : "Select mount"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search mounts..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No mount found.</CommandEmpty>
                          <CommandGroup>
                            {mounts.map((mount) => (
                              <CommandItem
                                value={mount.name}
                                key={mount.id}
                                onSelect={() => {
                                  form.setValue("lensData.mountId", mount.id);
                                }}
                              >
                                {mount.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    mount.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The lens mount.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lensData.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lens Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(LensType).map((LensType) => (
                        <SelectItem
                          className="capitalize"
                          key={LensType}
                          value={LensType}
                        >
                          {LensType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The lens type</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lensData.minFl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.watch("lensData.type") === "zoom"
                      ? "Min focal length"
                      : "Focal Length"}
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>{"Focal length"}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("lensData.type") === "zoom" && (
              <FormField
                control={form.control}
                name="lensData.maxFl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max FL</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      {"Maximum zoom focal length"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="lensData.maxAperture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Aperture</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>{"Fastest aperture"}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lensData.filterThread"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Filter thread size</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    {"Filter thread size in mm"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* 
          Camera type only fields 
        */}
        {form.watch("type") === "camera" && (
          <>
            <h2>Camera Details</h2>
            {/* Lens mount combo-box. Displays the mount name, and uses the mountId as the field value */}
            <FormField
              control={form.control}
              name="cameraData.mountId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Lens Mount</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? mounts.find((mount) => mount.id === field.value)
                                ?.name
                            : "Select mount"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search mounts..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No mount found.</CommandEmpty>
                          <CommandGroup>
                            {mounts.map((mount) => (
                              <CommandItem
                                value={mount.name}
                                key={mount.id}
                                onSelect={() => {
                                  form.setValue("cameraData.mountId", mount.id);
                                }}
                              >
                                {mount.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    mount.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The lens mount.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cameraData.megapixels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Megapixels</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="45" {...field} />
                  </FormControl>
                  <FormDescription>{""}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cameraData.cropFactor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop Factor</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} />
                  </FormControl>
                  <FormDescription>
                    {"A full-frame camera would have a crop factor of 1"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="pt-6">
          <Button className="w-full" type="submit" disabled={loading}>
            Create Product
          </Button>
        </div>
      </form>
    </Form>
  );
}

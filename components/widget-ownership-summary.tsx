import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, locale } from "@/lib";
import { Button } from "./ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { OwnershipWithProducts } from "@/lib/queries/ownership";

export default function OwnershipSummaryWidget({
  items,
  className,
}: {
  items: OwnershipWithProducts[];
  className?: string;
}) {
  const maxItems = 5;
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>
            <Link href="/bag">Your Gear</Link>
          </CardTitle>
          <CardDescription>Your latest acquisitions</CardDescription>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"sm"} asChild>
              <Link href={"/browse"}>
                <Plus className="h-4 w-4 " />
                <span className="sr-only">Add a Product to your Gear</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add to your Gear</TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent className="grid gap-8">
        {items.slice(0, maxItems).map((item) => (
          <article key={item.id} className="flex items-center gap-4">
            {/* <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar> */}

            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                <Link href={`/product/${item.productId}`}>
                  {item.products.name}
                </Link>
              </p>
              {item.purchaseDate && (
                <time className="text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat(locale, {
                    dateStyle: "medium",
                  }).format(item.purchaseDate)}{" "}
                </time>
              )}

              {/* <Badge>{item.id}</Badge> */}
            </div>
            <div className="ml-auto font-medium">
              {formatCurrency(item.price)}
            </div>
          </article>
        ))}
      </CardContent>

      {items.length > maxItems && (
        <CardFooter>
          <Button asChild variant={"outline"}>
            <Link href={"/bag"}>{`See All (${
              items.length - maxItems
            } more)`}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { locale } from "@/lib";
import { Badge } from "./ui/badge";
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
        <div>
          <CardTitle className="text-lg">Your Gear</CardTitle>
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
                <Link href={`/product/${item.product_id}`}>
                  {item.products.name}
                </Link>
              </p>
              {item.purchased_on && (
                <time className="text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat(locale, {
                    dateStyle: "medium",
                  }).format(item.purchased_on)}{" "}
                </time>
              )}

              {/* <Badge>{item.id}</Badge> */}
            </div>
            <div className="ml-auto font-medium">
              {new Intl.NumberFormat(locale, {
                style: "currency",
                currency: "USD",
              }).format(item.purchased_for)}
            </div>
          </article>
        ))}
      </CardContent>
      <CardFooter>
        <Button asChild variant={"outline"}>
          <Link href={"/bag"}>See All</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

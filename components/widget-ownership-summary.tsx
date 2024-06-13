import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { locale } from "@/lib";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

export default function OwnershipSummaryWidget({
  items,
  className,
}: {
  items: any[];
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
        <Button asChild size={"sm"}>
          <Link href={"/bag"}>See All</Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-8">
        {items.slice(0, maxItems).map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            {/* <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar> */}

            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {item.products.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Intl.DateTimeFormat(locale, {
                  dateStyle: "medium",
                }).format(item.purchased_on)}{" "}
                {/* <Badge variant={"outline"}>{item.condition}</Badge> */}
                {/* {new Intl.NumberFormat(locale, {
                  style: "unit",
                  unit: "gram",
                  unitDisplay: "short",
                }).format(item.products.weight)} */}
              </p>

              {/* <Badge>{item.id}</Badge> */}
            </div>
            <div className="ml-auto font-medium">
              {new Intl.NumberFormat(locale, {
                style: "currency",
                currency: "USD",
              }).format(item.purchased_for)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

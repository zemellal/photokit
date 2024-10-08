import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { listOwnershipsWithProductsLens } from "@/data/ownership";
import { TrendingUp } from "lucide-react";
import { ChartConfig } from "../ui/chart";
import PieChartLabel from "../charts/pie-chart-label";
import { cn } from "@/lib/utils";

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {}

export default async function LensTypeWidget({ className }: WidgetProps) {
  const ownershipData = await listOwnershipsWithProductsLens();

  let zooms = 0,
    primes = 0;

  /** sums how many of each type of lens the user owns */
  ownershipData.forEach((item) => {
    if (item.product.type === "lens") {
      if (item.product.lens?.type === "prime") primes += 1;
      else if (item.product.lens?.type === "zoom") zooms += 1;
    }
  });

  const chartData = [
    {
      lensType: "zoom",
      lenses: zooms,
      fill: "hsl(var(--primary))",
    },
    {
      lensType: "prime",
      lenses: primes,
      fill: "hsl(var(--secondary))",
    },
  ];

  const chartConfig = {
    lenses: {
      label: "Lenses",
    },
    prime: {
      label: "Primes",
      color: "hsl(var(--chart-1))",
    },
    zoom: {
      label: "Zooms",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  if (primes + zooms === 0) return <></>;

  return (
    <Card className={cn("", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Primes vs Zooms</CardTitle>
        {/* <CardDescription>Primes vs Zooms</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <PieChartLabel
          chartConfig={chartConfig}
          chartData={chartData}
          nameKey="lensType"
          dataKey="lenses"
        />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          {`You own ${primes + zooms} lenses`}
        </div>
      </CardFooter>
    </Card>
  );
}

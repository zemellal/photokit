"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { cn } from "@/lib/utils";
import { Offer } from "@prisma/client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { formatCurrency, localizeDate } from "@/lib";

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  offers: Offer[];
}

// TODO: only pass necessary data to client component
export default function ProductOffersWidget({
  offers,
  className,
}: WidgetProps) {
  const chartData = offers.map((offer) => ({
    date: new Date(offer.date),
    price: offer.price,
    // new: offer.itemCondition === 'NewCondition' && offer.price,
    // used: offer.itemCondition === 'UsedCondition' && offer.price
  }));
  console.log("Chart data: ", chartData);

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className={cn("", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Widget</CardTitle>
        <CardDescription>Desc</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => localizeDate(value)}
            />
            <YAxis
              dataKey="price"
              axisLine={false}
              tickFormatter={(value) =>
                formatCurrency(value, { maximumFractionDigits: 0 })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="price"
              type="natural"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          {`Shown from ${offers.length} data points`}
        </div>
      </CardFooter>
    </Card>
  );
}

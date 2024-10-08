"use client";

import { DollarSign, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
} from "@/components/ui/chart";
import { OwnershipWithProducts } from "@/data/ownership";
import { formatCurrency, formatDate, localizeDate } from "@/lib";
import Link from "next/link";
import { cn } from "@/lib/utils";

const chartConfig = {
  marketValue: {
    label: "Market Value",
    color: "hsl(var(--chart-3))",
    icon: DollarSign,
  },
} satisfies ChartConfig;

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  ownershipData: {
    purchaseDate: OwnershipWithProducts["purchaseDate"];
    price: OwnershipWithProducts["price"];
  }[];
}

// TODO: only pass necessary data to client component
export function OwnershipValueChart({ ownershipData, className }: WidgetProps) {
  const dataOrdered = [...ownershipData].reverse();
  let c = 0;

  /** Map the ordered data to date and value only for the chart */
  let chartData = dataOrdered.map((x) => ({
    // if the ownership item has no date, set the date to now
    date: new Date(x.purchaseDate || Date.now()),
    marketValue: (c += x.price),
  }));

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>
          <Link href={"/bag"}>Ownership Value</Link>
        </CardTitle>
        <CardDescription>
          Showing your total equipment&lsquo;s value over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
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
              tickFormatter={(value) =>
                localizeDate(value, { month: "numeric", year: "numeric" })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
              tickFormatter={(value) =>
                formatCurrency(value, { maximumFractionDigits: 0 })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="marketValue"
              type="step"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              stroke="hsl(var(--primary))"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {/* <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div> */}
            {chartData && (
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {`${localizeDate(chartData[0]?.date, {
                  year: "numeric",
                  month: "short",
                })} - ${formatDate(chartData[chartData.length - 1]?.date, {
                  year: "numeric",
                  month: "short",
                })}`}
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

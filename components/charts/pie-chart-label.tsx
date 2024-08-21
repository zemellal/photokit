"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function PieChartLabel({
  chartConfig,
  chartData,
  dataKey,
  nameKey,
}: {
  chartConfig: ChartConfig;
  chartData: object[];
  dataKey: string;
  nameKey: string;
}) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey={dataKey} label nameKey={nameKey} />
      </PieChart>
    </ChartContainer>
  );
}

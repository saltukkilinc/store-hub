"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

type CustomBarChartPropsType<T> = {
  data: T[];
  xAxisDataKey: string;
  yAxisDataKey: string;
  barDataKey: string;
  barFill: string;
  chartConfig: ChartConfig;
  title: string;
  description: string;
};

export default function CustomBarChart<T>({
  data,
  xAxisDataKey,
  yAxisDataKey,
  barDataKey,
  barFill,
  chartConfig,
  title,
  description,
}: CustomBarChartPropsType<T>) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pl-14">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisDataKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis dataKey={yAxisDataKey} tickLine={false} tickMargin={10} />
            <Bar dataKey={barDataKey} radius={4} fill={barFill} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { Monitor } from "lucide-react";

// ** 1-) Start by defining your data. (You change the color of specific object like this: fill: "var(--color-desktop)")
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
// ** 2-) Define your chart config. (an icon or a  theme also can be added)
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
    icon: Monitor,
    // theme: {
    //   light: "#2563eb",
    //   dark: "#dc2626",
    // }
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

// ** 3-) Add min-h value for a responsive chart.
// ** 4-) Add a CartesianGrid to the chart.
// ** 5-) Add an axis to the chart by using XAxis component.
// ** 6-) Add a tooltip to the chart by using  custom ChartTooltip & ChartTooltipContent components.
// ** 7-) Add a legend to the chart by using custom ChartLegend & ChartLegendContent components.
// ** 8-) Color can be defined in chartConfig in all css color formats including css variables like this: "hsl(var(--chart-1))" or hex "#60a5fa".After color is defined, it can be used in the chart components or chartData like this: fill: "var(--color-desktop)" or tailwind style className="fill-[--color-mobile]".
// ** 9-) Tooltip contains label, name, indicator and value. To customize use these props: labelKey, nameKey, indicator, hideLabel and hideIndicator. (label or name key must be chosen from the config or data key)
// ** 10-) To use a custom key for legend names, use the nameKey prop.
// ** 11- ) accessibilityLayer prop adds keyboard access and screen reader support to your charts.
export default function ExampleChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

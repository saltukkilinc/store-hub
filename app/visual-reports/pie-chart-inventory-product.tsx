"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InventoryType } from "../inventory/inventory-data-table-columns";

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ];

const chartConfig = {
  stockQuantity: {
    label: "Stock Quantity",
  },
  product1: {
    color: "hsl(var(--chart-1))",
  },
  product2: {
    color: "hsl(var(--chart-2))",
  },
  product3: {
    color: "hsl(var(--chart-3))",
  },
  product4: {
    color: "hsl(var(--chart-4))",
  },
  product5: {
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

type PieChartInventoryProductPropsType = {
  data: InventoryType[];
};
export default function PieChartInventoryProduct({
  data,
}: PieChartInventoryProductPropsType) {
  const colorizedData = data.map((i, index) => ({
    ...i,
    fill: `var(--color-product${(index % data.length) + 1})`,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Inventory Product Pie Chart</CardTitle>
        <CardDescription>
          This chart shows the product distribution in inventory data.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={colorizedData}
              dataKey="stockQuantity"
              nameKey="productName"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InventoryType } from "../inventory/inventory-data-table-columns";
import { ProductType } from "../products/product-data-table-column";
import { getRandomHslColor } from "@/lib/utils";

type PieChartInventoryProductPropsType = {
  data: InventoryType[];
  products: ProductType[];
};
export default function PieChartInventoryProduct({
  data,
  products,
}: PieChartInventoryProductPropsType) {
  const chartConfig = products.reduce((acc: ChartConfig, product) => {
    acc[product.productName] = {
      label: product.productName,
      color: getRandomHslColor(),
    };
    return acc;
  }, {});

  const colorizedData = data.map((i, index) => ({
    ...i,
    fill: `var(--color-${products[index].productName})`,
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
            <ChartLegend
              content={<ChartLegendContent nameKey="productName" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

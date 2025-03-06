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

import { ProductType } from "../products/product-data-table-column";
import { getRandomHslColor } from "@/lib/utils";
import { ReadyForSaleProductsType } from "../ready-for-sale-products/ready-for-sale-data-table-columns";

type PieChartReadyForSaleProductPropsType = {
  data: ReadyForSaleProductsType[];
  products: ProductType[];
};
export default function PieChartReadyForSaleProduct({
  data,
  products,
}: PieChartReadyForSaleProductPropsType) {
  const chartConfig = products.reduce((acc: ChartConfig, product) => {
    acc[product.productName.replace(" ", "")] = {
      label: product.productName,
      color: getRandomHslColor(),
    };
    return acc;
  }, {});

  const colorizedData = data.map((i) => ({
    ...i,
    fill: `var(--color-${i.productName.replace(" ", "")})`,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Ready For Sale Product Pie Chart</CardTitle>
        <CardDescription>
          This chart shows the product distribution in Ready for sale products.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={colorizedData}
              dataKey="availableQuantity"
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

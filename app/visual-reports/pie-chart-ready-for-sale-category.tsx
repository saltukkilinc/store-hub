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
import { getRandomHslColor } from "@/lib/utils";
import { CategoryType } from "../categories/category-data-table-columns";
import { ReadyForSaleProductsType } from "../ready-for-sale-products/ready-for-sale-data-table-columns";

type PieChartReadyForSaleCategoryPropsType = {
  data: ReadyForSaleProductsType[];
  categories: CategoryType[];
};
export default function PieChartReadyForSaleCategory({
  data,
  categories,
}: PieChartReadyForSaleCategoryPropsType) {
  // Creating a chart config object includes label, color, icon, theme etc.
  const chartConfig = categories.reduce((acc: ChartConfig, item) => {
    acc[item.category.replace(/\s/g, "")] = {
      label: item.category,
      color: getRandomHslColor(),
    };
    return acc;
  }, {});
  // In this data, there can be same category more than once so we are combining them.Also we are referencing the color defined in teh chart config.
  const handleCategory = () => {
    const array: {
      category: string;
      fill: string;
      availableQuantity: number;
    }[] = [];
    data.forEach((i) => {
      const foundIndex = array.findIndex(
        (item) => item.category === i.category
      );
      if (foundIndex === -1) {
        array.push({
          category: i.category,
          availableQuantity: i.availableQuantity,
          fill: `var(--color-${i.category.replace(/\s/g, "")})`,
        });
      }
      if (foundIndex !== -1) {
        array[foundIndex].availableQuantity += i.availableQuantity;
      }
    });
    return array;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Ready For Sale Category Pie Chart</CardTitle>
        <CardDescription>
          This chart shows the ready for sale category distribution in inventory
          data.
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
              data={handleCategory()}
              dataKey="availableQuantity"
              nameKey="category"
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

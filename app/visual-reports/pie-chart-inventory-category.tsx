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
import { getRandomHslColor } from "@/lib/utils";
import { CategoryType } from "../categories/category-data-table-columns";

type PieChartInventoryCategoryPropsType = {
  data: InventoryType[];
  categories: CategoryType[];
};
export default function PieChartInventoryCategory({
  data,
  categories,
}: PieChartInventoryCategoryPropsType) {
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
    const array: { category: string; fill: string; stockQuantity: number }[] =
      [];
    data.forEach((i) => {
      const foundIndex = array.findIndex(
        (item) => item.category === i.category
      );
      if (foundIndex === -1) {
        array.push({
          category: i.category,
          stockQuantity: i.stockQuantity,
          fill: `var(--color-${i.category.replace(/\s/g, "")})`,
        });
      }
      if (foundIndex !== -1) {
        array[foundIndex].stockQuantity += i.stockQuantity;
      }
    });
    return array;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Inventory Category Pie Chart</CardTitle>
        <CardDescription>
          This chart shows the category distribution in inventory data.
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
              dataKey="stockQuantity"
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

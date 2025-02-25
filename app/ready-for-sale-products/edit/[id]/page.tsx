import {
  getReadyForSaleProductItem,
  updateReadyForSaleProductItem,
} from "@/lib/actions/ready-for-sale-products-actions";
import ReadyForSaleProductsForm, {
  ReadyForSaleProductsFormValues,
} from "../../ready-for-sale-products-form";
import { getProducts } from "@/lib/actions/product-actions";
import { getCategories } from "@/lib/actions/category-actions";

type EditReadyForSaleProductsPagePropsType = {
  params: Promise<{ id: string }>;
};
export default async function EditReadyForSaleProductsPage({
  params,
}: EditReadyForSaleProductsPagePropsType) {
  const productId = (await params).id;
  const productItem = await getReadyForSaleProductItem(productId);
  const getProductItemWithoutId = () => {
    if (!productItem) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...productItemWithoutId } = productItem;
    return productItemWithoutId;
  };

  const productsData = getProducts();
  const categoriesData = getCategories();
  const [products, categories] = await Promise.all([
    productsData,
    categoriesData,
  ]);

  const handleEditProducts = async (values: ReadyForSaleProductsFormValues) => {
    "use server";
    await updateReadyForSaleProductItem({ ...values, id: productId });
  };
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-center">Edit Ready For Sale Products Form</h1>
      <ReadyForSaleProductsForm
        submitHandler={handleEditProducts}
        values={getProductItemWithoutId()}
        products={products}
        categories={categories}
      />
    </main>
  );
}

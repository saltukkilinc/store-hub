import {
  getReadyForSaleProductItem,
  updateReadyForSaleProductItem,
} from "@/lib/actions/my-store";
import MyStoreForm, { MyStoreFormValues } from "../../my-store-form";
import { getProducts } from "@/lib/actions/product-actions";
import { getCategories } from "@/lib/actions/category-actions";

type EditReadyForSaleProductsPagePropsType = {
  params: Promise<{ id: string }>;
};
export default async function EditMyStorePage({
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

  const handleEditProducts = async (values: MyStoreFormValues) => {
    "use server";
    await updateReadyForSaleProductItem({ ...values, id: productId });
  };
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-center text-2xl">Edit My Store</h1>
      <MyStoreForm
        submitHandler={handleEditProducts}
        values={getProductItemWithoutId()}
        products={products}
        categories={categories}
      />
    </main>
  );
}

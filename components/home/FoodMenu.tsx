import { getActiveFoodMenu } from "@/lib/food-menu";
import FoodMenuClient from "./FoodMenuClient";

export default async function FoodMenu() {
  const items = await getActiveFoodMenu();

  const itemsByCategory: Record<string, typeof items> = {};
  for (const item of items) {
    if (!itemsByCategory[item.category]) {
      itemsByCategory[item.category] = [];
    }
    itemsByCategory[item.category].push(item);
  }

  const categories = Object.keys(itemsByCategory);

  return <FoodMenuClient categories={categories} itemsByCategory={itemsByCategory} />;
}

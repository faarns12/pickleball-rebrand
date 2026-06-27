import { getActiveFoodMenu } from "@/lib/food-menu";
import MenuPageClient from "./MenuPageClient";

export const metadata = {
  title: "Food Menu | Pickleball BD",
  description: "Explore our delicious food menu — quick bites, healthy snacks, beverages, and more.",
};

export default async function MenuPage() {
  const items = await getActiveFoodMenu();

  const itemsByCategory: Record<string, typeof items> = {};
  for (const item of items) {
    if (!itemsByCategory[item.category]) {
      itemsByCategory[item.category] = [];
    }
    itemsByCategory[item.category].push(item);
  }

  const categories = Object.keys(itemsByCategory);

  return <MenuPageClient categories={categories} itemsByCategory={itemsByCategory} />;
}

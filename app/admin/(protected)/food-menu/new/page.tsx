import { createFoodMenuItem, getFoodMenuCategories } from "@/app/admin/food-menu-actions";
import FoodMenuForm from "../FoodMenuForm";

export default async function NewFoodMenuItemPage() {
  const existingCategories = await getFoodMenuCategories();

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add Menu Item</h1>
        <p className="text-gray-500 text-sm mt-1">Add a new item to the food menu</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <FoodMenuForm
          action={createFoodMenuItem}
          submitLabel="Add Item"
          existingCategories={existingCategories}
        />
      </div>
    </div>
  );
}

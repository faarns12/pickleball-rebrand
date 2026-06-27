import { notFound } from "next/navigation";
import { getFoodMenuItemByIdAdmin, updateFoodMenuItem, getFoodMenuCategories } from "@/app/admin/food-menu-actions";
import FoodMenuForm from "../../FoodMenuForm";

export default async function EditFoodMenuItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, existingCategories] = await Promise.all([
    getFoodMenuItemByIdAdmin(Number(id)),
    getFoodMenuCategories(),
  ]);
  if (!item) notFound();

  const action = async (formData: FormData) => {
    "use server";
    await updateFoodMenuItem(item.id, formData);
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Menu Item</h1>
        <p className="text-gray-500 text-sm mt-1">Update details for &quot;{item.name}&quot;</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <FoodMenuForm
          action={action}
          initialData={{
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image: item.image,
            is_active: item.is_active,
          }}
          submitLabel="Save Changes"
          existingCategories={existingCategories}
        />
      </div>
    </div>
  );
}

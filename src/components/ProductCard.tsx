import { useState } from "react";
import { toast } from "sonner";
import { DataTypeProduct } from "@/lib/dataProduct";
import { supabase } from "@/lib/supabaseClient";

interface ProductCardProps {
  product: DataTypeProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function updateProduct() {
    if (!name.trim() || !description.trim()) {
      toast.error("Name and description cannot be empty");
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("s2products")
        .update({
          name: name.trim(),
          description: description.trim(),
        })
        .eq("id", product.id);

      if (error) throw error;
      
      toast.success("Product updated successfully!");
      setEditing(false);
      // No need for window.location.reload() as real-time updates will handle the UI
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(`Error updating product: ${errorMessage}`);
    } finally {
      setIsUpdating(false);
    }
  }

  async function deleteProduct() {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("s2products")
        .delete()
        .eq("id", product.id);

      if (error) throw error;
      
      toast.success("Product deleted successfully!");
      // No need for window.location.reload() as real-time updates will handle the UI
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(`Error deleting product: ${errorMessage}`);
    } finally {
      setIsDeleting(false);
    }
  }

  function handleCancel() {
    setEditing(false);
    setName(product.name);
    setDescription(product.description);
  }

  // Update local state when props change due to real-time updates
  if (product.name !== name && !editing) {
    setName(product.name);
  }
  if (product.description !== description && !editing) {
    setDescription(product.description);
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        {!editing ? (
          <>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex space-x-2">
              <button
                onClick={deleteProduct}
                disabled={isDeleting}
                className={`px-4 py-2 text-white rounded transition duration-300 ${
                  isDeleting
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete Product"}
              </button>
              <button
                onClick={() => setEditing(true)}
                disabled={isDeleting}
                className={`px-4 py-2 text-white rounded transition duration-300 ${
                  isDeleting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
              >
                Edit Product
              </button>
            </div>
          </>
        ) : (
          <>
            <h4 className="text-lg font-semibold mb-2">Editing Product</h4>
            <button
              onClick={handleCancel}
              disabled={isUpdating}
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-sm mb-4 hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor={`name-${product.id}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id={`name-${product.id}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isUpdating}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor={`description-${product.id}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Description
                </label>
                <input
                  type="text"
                  id={`description-${product.id}`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isUpdating}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              <button
                onClick={updateProduct}
                disabled={isUpdating}
                className={`w-full px-4 py-2 text-white rounded transition duration-300 ${
                  isUpdating
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isUpdating ? "Updating..." : "Update Product"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
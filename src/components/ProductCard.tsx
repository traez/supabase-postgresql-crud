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

  async function updateProduct() {
    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: name,
          description: description,
        })
        .eq("id", product.id);

      if (error) throw error;
      toast.success("Product updated successfully!");
      window.location.reload();
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(`Error updating product: ${errorMessage}`);
    }
  }

  async function deleteProduct() {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) throw error;
      toast.success("Product deleted successfully!");
      window.location.reload();
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(`Error deleting product: ${errorMessage}`);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        {editing === false ? (
          <>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => deleteProduct()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Delete Product
              </button>
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
              >
                Edit Product
              </button>
            </div>
          </>
        ) : (
          <>
            <h4 className="text-lg font-semibold mb-2">Editing Product</h4>
            <button
              onClick={() => setEditing(false)}
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-sm mb-4 hover:bg-gray-400 transition duration-300"
            >
              Go Back
            </button>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={product.name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Description
                </label>
                <input
                  type="text"
                  id="description"
                  defaultValue={product.description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => updateProduct()}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Update Product in Supabase DB
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import ProductCard from "./ProductCard";
import { supabase } from "@/lib/supabaseClient";
import { DataTypeProduct } from "@/lib/dataProduct";
//import { DataTypeProduct, arrayProduct } from "@/lib/dataProduct";

export default function ProductHome() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState<DataTypeProduct[]>([]);
  //const [products, setProducts] = useState<DataTypeProduct[]>(arrayProduct);

  console.log(name, description);

  useEffect(() => {
    getProducts();
    //setProducts(arrayProduct);

      // Subscribe to realtime updates
    const channel = supabase
    .channel("realtime:s2products")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "s2products" },
      (payload: RealtimePostgresChangesPayload<DataTypeProduct>) => {
        handleRealtimeUpdate(payload);
      }
    )
    .subscribe();

  // Cleanup subscription on component unmount
  return () => {
    supabase.removeChannel(channel);
  };
  }, []);

  async function getProducts() {
    try {
      const { data, error } = await supabase.from("s2products").select("*");
      //.limit(10);
      if (error) throw error;
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      alert(errorMessage);
    }
  }

  function handleRealtimeUpdate(
    payload: RealtimePostgresChangesPayload<DataTypeProduct>
  ) {
    if (payload.eventType === "INSERT" && payload.new) {
      const newProduct = payload.new as DataTypeProduct;
      setProducts((prev) => [...prev, newProduct]);
    } else if (payload.eventType === "UPDATE" && payload.new) {
      const updatedProduct = payload.new as DataTypeProduct;
      setProducts((prev) =>
        prev.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } else if (payload.eventType === "DELETE" && payload.old) {
      const deletedProduct = payload.old as DataTypeProduct;
      setProducts((prev) =>
        prev.filter((product) => product.id !== deletedProduct.id)
      );
    }
  }
  
  async function createProduct() {
    try {
      const { error } = await supabase
        .from("s2products")
        .insert({
          name: name,
          description: description,
        })
        .single();

      if (error) throw error;
      toast.success("Product created successfully!");
      window.location.reload();
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(`Error: ${errorMessage}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Store Products</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                Inspired by Cooper Codes
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Create Product For Supabase Database
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => createProduct()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Product in Supabase DB
              </button>
            </div>
          </div>

          <hr className="my-8" />

          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Current Database Items
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

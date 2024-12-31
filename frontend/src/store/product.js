import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {

  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  // Create a new product
  createProduct: async (newProduct) => {
    // Basic client-side validation
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!data.success) {
        // Server-side error
        return { success: false, message: data.message };
      }

      // Add the newly created product to our local products array
      set((state) => ({ products: [...state.products, data.data] }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error creating product:", error.message);
      return { success: false, message: "Failed to create product." };
    }
  },

  // Fetch all products
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (data.success) {
        set({ products: data.data });
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  },

  // Delete a product
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Remove the product from local store updates ui immediately, wihtouting needing to refresh the page
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting product:", error.message);
      return { success: false, message: "Failed to delete product." };
    }
  },

  // Update an existing product
  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
 
      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update the product in our local products array and update UI immediately
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating product:", error.message);
      return { success: false, message: "Failed to update product." };
    }
  },
}));
import React, { useState, useContext, useEffect } from "react";
import {
  useProducts,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../api/api";
import { GlobalContext } from "../components/GloablState";
import { Product } from "../api/api";
import "../styles/Admin.css";

const AdminPanel: React.FC = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("AdminPanel must be used within a GlobalProvider");
  }
  const { state, dispatch } = context;

  const { data: products, isLoading, error } = useProducts();
  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    title: "",
    price: 0,
    category: "",
    image: "",
    description: "",
    quantity: 1,
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (products) {
      dispatch({ type: "SET_PRODUCTS", payload: products });
    }
  }, [products, dispatch]);

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.category || !newProduct.image || !newProduct.description || isNaN(newProduct.price)) {
      alert("Please fill all fields and enter a valid price.");
      return;
    }
    addProductMutation.mutate(newProduct, {
      onSuccess: (data) => {
        dispatch({ type: "ADD_PRODUCT", payload: data });
        setNewProduct({ title: "", price: 0, category: "", image: "", description: "", quantity: 1 });
      },
    });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProductMutation.mutate(id, {
      onSuccess: () => {
        dispatch({ type: "DELETE_PRODUCT", payload: id });
      },
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = () => {
    if (editingProduct) {
      updateProductMutation.mutate(editingProduct, {
        onSuccess: (updatedProduct) => {
          dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
          setEditingProduct(null);
        },
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {(error as Error).message}</p>;

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <h3>Add New Product</h3>
      <div className="input-group">
        <label>Title:</label>
        <input type="text" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
      </div>
      <div className="input-group">
        <label>Price:</label>
        <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })} />
      </div>
      <div className="input-group">
        <label>Category:</label>
        <input type="text" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
      </div>
      <div className="input-group">
        <label>Image URL:</label>
        <input type="text" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
      </div>
      <div className="input-group">
        <label>Description:</label>
        <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}></textarea>
      </div>
      <button onClick={handleAddProduct} className="add-product-button">Add Product</button>

      <h3>Existing Products</h3>
      <ul className="product-list">
        {state.products.map((product) => (
          <li key={product.id} className="product-item">
            {editingProduct && editingProduct.id === product.id ? (
              <div className="edit-product-form">
                <input type="text" value={editingProduct.title} onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })} />
                <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })} />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="product-details">
                  <strong>{product.title}</strong> - ${product.price}
                  <p>{product.description}</p>
                </div>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;

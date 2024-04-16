import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

const ProductDetails = ({ selectedProduct, category }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false); 

  const handleAdd = () => {
    const token = localStorage.getItem("id");
    if (!token) {
      toast.error("Please Login to Add Product to Cart");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1400);
      return;
    }

    const userId = localStorage.getItem("id");
    setIsAdding(true); 

    dispatch(
      createCart({
        productId: selectedProduct._id,
        quantity: quantity,
        userId: userId,
        message: "Added Product to Cart Successfully",
      })
    )
      .then(() => {
        setIsAdding(false); 
      })
      .catch((error) => {
        setIsAdding(false); 
        console.error("Error adding product to cart:", error);
      });
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section className="product-page p-12">
      <Container>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              loading="lazy"
              src={
                selectedProduct?.image ||
                "https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png"
              }
              alt=""
            />
          </div>
          <div className="md:w-1/2 md:ml-10 mt-4 md:mt-0">
            <h2 className="text-3xl font-bold">{selectedProduct?.title}</h2>
            <h2 className="text-md mt-3">{selectedProduct?.brand}</h2>
            <h2 className="text-md mt-3">{category}</h2>
            <div className="info">
              <span className="price mt-8 font-bold">
                ₹ {selectedProduct?.price}
              </span>
            </div>
            <div className="info">
              <span className="mt-3">
                {selectedProduct?.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="border p-2 border-black w-28 my-4 flex items-center justify-center">
              <button className="px-1" onClick={decrease}>
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button className="px-1" onClick={increase}>
                +
              </button>
            </div>
            <button
              aria-label="Add"
              type="submit"
              className={`${quantity === 0 ? "bg-gray-200 text-white" : "bg-gray-800"} text-white rounded-sm px-4 py-2`}
              disabled={quantity === 0 || isAdding} 
              onClick={handleAdd}
            >
              {isAdding ? "Adding..." : "Add To Cart"}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetails;

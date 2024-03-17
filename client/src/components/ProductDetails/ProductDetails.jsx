import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

const ProductDetails = ({ selectedProduct,category }) => {
  const dispatch = useDispatch();

  let [quantity, setQuantity] = useState(0);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handelAdd = (selectedProduct, quantity) => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  const increase = () => {
    setQuantity(quantity + 1);
  }
  const decrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <section className="product-page p-12">
      <Container>
        <div className="flex w-full">
          <div className="w-[50%] top-0">
            <img loading="lazy" className="top-0" src={selectedProduct?.imgUrl || "https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png"} alt="" />
          </div>
          <div className="ml-10 w-[50%]">
            <h2 className="text-3xl top-0 font-bold">{selectedProduct?.title}</h2>
            <h2 className="text-md mt-3">{selectedProduct?.brand}</h2>
            <h2 className="text-md mt-3">{category}</h2>
            <div className="info">
              <span className="price mt-8 font-bold">${selectedProduct?.price}</span>
            </div>
            <div className="info">
              <span className="mt-3">{selectedProduct?.quantity > 0 ? "In Stock" : "Out of Stock"}</span>
            </div>
            {/* <p>{selectedProduct?.shortDesc}</p> */}
            <div className="border p-2 border-black w-28 my-4 flex items-center justify-center">
              <button className="px-1" onClick = {decrease}>-</button>
              <span className="px-4">{quantity}</span>
              <button className="px-1" onClick={increase}>+</button>
            </div>

            <button
              aria-label="Add"
              type="submit"
              className={`${quantity === 0 ? "bg-gray-200 text-white" : "bg-gray-800"} text-white rounded-sm px-4 py-2`} 
              disabled={quantity === 0}
              onClick={() => handelAdd(selectedProduct, quantity)}
            >
              Add To Cart
            </button>          
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetails;

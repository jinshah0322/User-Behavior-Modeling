import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { FaStar, FaRegStar,FaStarHalfAlt } from 'react-icons/fa';

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem._id}`);
  };
  const handelAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };
  return (
    <Col className="product mtop">
      {title === "Big Discount" ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={productItem.image || "https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png"}
        alt=""
      />    
      <div className="product-details">
        <div className="flex w-[full] justify-between items-center">
        <h3 className="title_product" onClick={() => handelClick()}>{productItem.title}</h3>
        <div className="rate flex items-center">
  {/* Full stars */}
  {Array.from({ length: Math.floor(productItem?.totalrating) }, (_, index) => (
    <FaStar key={index} className="text-yellow-500 ml-1"/>
  ))}
  
  {/* Half star */}
  {productItem?.totalrating % 1 !== 0 && (
    <FaStarHalfAlt className="text-yellow-500 ml-1"/>
  )}

  {/* Empty stars */}
  {Array.from({ length: Math.floor(5 - productItem?.totalrating) }, (_, index) => (
    <FaRegStar key={index} className="ml-1"/>
  ))}
</div>        
        </div>      

       
        <div className="mt-2 flex w-full justify-between items-center">
          <h4>₹ {productItem.price}</h4>        
        <div>
          {productItem?.quantity > 0 ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-stock">Out of Stock</span>
          )}
        </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;

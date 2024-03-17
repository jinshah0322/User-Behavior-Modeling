import { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";
const Product = () => {
  const { id } = useParams();
  console.log(id);
  const [selectedProduct, setSelectedProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [category, setCategory] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
      const data = await response
      setSelectedProduct(data?.data?.product);
      setCategory(data?.data?.categoryName);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  useWindowScrollToTop();

  return (
    <Fragment>
      <ProductDetails selectedProduct={selectedProduct} category={category} />
      <ProductReviews selectedProduct={selectedProduct} fetchData={fetchData} />
      {/* <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section> */}
    </Fragment>
  );
};

export default Product;

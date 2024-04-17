import { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";
import Loader from "../components/Loader/Loader"; 

const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true); 

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/product/${id}`);
      const data = await response
      setSelectedProduct(data?.data?.product);
      setCategory(data?.data?.categoryName);
      setLoading(false); 
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
      {loading ? ( 
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
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
      )}
    </Fragment>
  );
};

export default Product;
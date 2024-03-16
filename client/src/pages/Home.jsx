import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import axios from "axios";
// import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useEffect,useState } from "react";
const Home = () => {
  // const newArrivalData = products.filter(
  //   (item) => item.category === "mobile" || item.category === "wireless"
  // );
    const [products,setProducts] = useState([]);
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/product");
        const data = await response
        setProducts(data?.data?.products);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      getProducts();
    }
    , []);
  // const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={products}
      />
      {/* <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      /> */}
      {/* <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} /> */}
    </Fragment>
  );
};

export default Home;

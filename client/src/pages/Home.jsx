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
    const [electronics,setElectronics] = useState([]);
    const [clothing,setClothing] = useState([]);
    const [books,setBooks] = useState([]);
    const [sport,setSport] = useState([]);
    const getElectronicProdcuts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/product/category/6606e04023ff446d9816a853`);
        const data = await response
        setElectronics(data?.data?.products);
      } catch (error) {
        console.error(error);
      }
    };
    const getClothingProdcuts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/product/category/6606e04a23ff446d9816a85a`);
        const data = await response
        setClothing(data?.data?.products);
      } catch (error) {
        console.error(error);
      }
    };
    const getBooksProdcuts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/product/category/6606e04d23ff446d9816a862`);
        const data = await response
        setBooks(data?.data?.products);
      } catch (error) {
        console.error(error);
      }
    };
    const getSportsProdcuts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/product/category/6606e05123ff446d9816a86b`);
        const data = await response
        setSport(data?.data?.products);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      getElectronicProdcuts();
      getClothingProdcuts();
      getBooksProdcuts();
      getSportsProdcuts();
    }
    , []);
  // const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Electronics"
        bgColor="#f6f9fc"
        productItems={electronics}
      />
      <Section
        title="Clothing"
        bgColor="#f6f9fc"
        productItems={clothing}
      />
      <Section
        title="Books"
        bgColor="#f6f9fc"
        productItems={books}
      />
      <Section
        title="Sports"
        bgColor="#f6f9fc"
        productItems={sport}
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

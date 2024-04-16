import { Fragment, useState , useEffect} from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import axios from "axios";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Loader from "../components/Loader/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [electronics, setElectronics] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [books, setBooks] = useState([]);
  const [sport, setSport] = useState([]);

  const fetchData = async () => {
    try {
      const [electronicsResponse, clothingResponse, booksResponse, sportResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_SERVERURL}/product/category/6606e04023ff446d9816a853`),
        axios.get(`${process.env.REACT_APP_SERVERURL}/product/category/6606e04a23ff446d9816a85a`),
        axios.get(`${process.env.REACT_APP_SERVERURL}/product/category/6606e04d23ff446d9816a862`),
        axios.get(`${process.env.REACT_APP_SERVERURL}/product/category/6606e05123ff446d9816a86b`)
      ]);
      setElectronics(electronicsResponse.data.products);
      setClothing(clothingResponse.data.products);
      setBooks(booksResponse.data.products);
      setSport(sportResponse.data.products);
      setLoading(false); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useWindowScrollToTop();

  return (
    <Fragment>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <Fragment>
          <SliderHome />
          <Wrapper />
          <Section
            title="Electronics"
            bgColor="#f6f9fc"
            productItems={electronics}
            id="6606e04023ff446d9816a853"
          />
          <Section
            title="Clothing"
            bgColor="#f6f9fc"
            productItems={clothing}
            id="6606e04a23ff446d9816a85a"
          />
          <Section
            title="Books"
            bgColor="#f6f9fc"
            productItems={books}
            id="6606e04d23ff446d9816a862"
          />
          <Section
            title="Sports"
            bgColor="#f6f9fc"
            productItems={sport}
            id="6606e05123ff446d9816a86b"
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
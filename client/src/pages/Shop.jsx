import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import {useEffect} from "react";
import axios from "axios";

const Shop = () => {
  const [productItems, setProductItems] = useState();
  const [filterList, setFilterList] = useState();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/product`);
      const data = await response
      setProductItems(data?.data?.products);
      setFilterList(data?.data?.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <Fragment>
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} products={productItems} />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setProductItems} />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;

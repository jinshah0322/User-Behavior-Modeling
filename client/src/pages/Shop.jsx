import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState } from "react";
import ShopList from "../components/ShopList";
import { useEffect } from "react";
import axios from "axios";
import { Pagination } from 'antd';
import Loader from "../components/Loader/Loader";
import PriceSort from "../components/Sort/PriceSort";

const Shop = () => {
  const [productItems, setProductItems] = useState();
  const [categoryFilter, setCategoryFilter] = useState();
  const [searchItem, setSearchItem] = useState("");
  const [totalCount, setTotalCount] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(16);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [pagination, setPagination] = useState(1);
  const queryParam = window.location.search;
  const category = queryParam.split("=")[1];
  const defaultValue = category;
  
  // const limit=15;
  const fetchProducts = async () => {
    try {    
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/product/fetchProducts`, { category: categoryFilter || defaultValue , search: searchItem, skip: searchItem?.length > 0 || categoryFilter ? 0 : skip, limit: limit ,sort:sortOrder});
      const data = await response
      setProductItems(data?.data?.products);
      console.log(data)
      setTotalCount(data?.data?.totalProducts)
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handlePaginationChange = (page) => {
    setSkip((page - 1) * limit);
    setPagination(page);
  }
  console.log(categoryFilter);
  console.log(searchItem);
  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, searchItem, skip, limit,defaultValue,sortOrder]);


  return (
    <Fragment>
      <section className="filter-bar mt-12">
        <Container className="filter-bar-contianer">
          <div className="justify-center items-center grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8">
            <div className="grid grid-cols-2 gap-2 lg:w-[70%]">
              <FilterSelect setCategoryFilter={setCategoryFilter} defaultValue={defaultValue}/>
              <PriceSort setSortOrder={setSortOrder} />
            </div>
            <div className="lg:w-[50%] lg:ml-auto">
              <SearchBar setSearchItem={setSearchItem} />
            </div>            
          </div>
        </Container>
       {loading?<Loader /> :<> <Container className="mt-8">
          <ShopList productItems={productItems} />
        </Container>
      <div className="flex w-full items-center justify-center w-full py-8">
        <Pagination defaultCurrent={1} total={totalCount} current={pagination} defaultPageSize={limit} onChange={handlePaginationChange} />
      </div></>}
      </section>      
    </Fragment>
  );
};

export default Shop;

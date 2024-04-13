import Select from 'react-select';
import {   
    fetchCategoriesAsync,
  } from "../app/features/category/categorySlice";
  import { useSelector, useDispatch } from "react-redux";
  import { useEffect } from "react";

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
        backgroundColor: "#0f3460",
        color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({setFilterList,products}) => {
    console.log(products);
    const categoryList = useSelector((state) => state.category.categoryList);
    console.log(categoryList);
    const options = categoryList.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const dispatch = useDispatch();    
    const handleChange = (selectedOption)=> {
        console.log(selectedOption.value);
        setFilterList(products.filter(item => item.category.toLowerCase() ===selectedOption.value))
    }
    useEffect(() => {
        dispatch(fetchCategoriesAsync());
      }, [dispatch]);
    return (
        <Select
    options={options}
    defaultValue={{ value: "", label: "Filter By Category" }}
    styles={customStyles}
    onChange={handleChange}
    />
    );
};

export default FilterSelect;

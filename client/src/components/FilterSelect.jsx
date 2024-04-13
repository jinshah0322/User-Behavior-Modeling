import Select from 'react-select';
import {   
    fetchCategoriesAsync,
  } from "../app/features/category/categorySlice";
  import { useSelector, useDispatch } from "react-redux";
  import { useEffect } from "react";


const customStyles = {
    menu: (provided) => ({ ...provided, maxHeight:"220px",overflow:"auto",width:"200px" }),
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        textTransform: "capitalize",       
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

const FilterSelect = ({setCategoryFilter,defaultValue}) => {
    const categoryList = useSelector((state) => state.category.categoryList);

    console.log(categoryList);
    let options = categoryList.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    options = [{ value: "all", label: "All" }, ...options];
    const defaultName = options.find((item) => item.value === defaultValue)?.label;
    console.log(defaultName);
    const dispatch = useDispatch();    
    const handleChange = (selectedOption)=> {
        setCategoryFilter(selectedOption.value)
    }
    useEffect(() => {
        dispatch(fetchCategoriesAsync());
      }, [dispatch]);
    return (
        <Select
    options={options}
    defaultValue={{ value: defaultValue,label: defaultName && defaultName || "All"}}
    styles={customStyles}
    onChange={handleChange}
    />    
    );
};

export default FilterSelect;

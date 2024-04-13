import React from 'react';
import Select from 'react-select';


const customStyles = {
    menu: (provided) => ({ ...provided, maxHeight:"220px",overflow:"auto",width:"200px" }),
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        // width: "200px",
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

const PriceSort = ({setSortOrder}) => {
    const handleChange = (value) => {
        setSortOrder(value.value)
    }
  return (
    <div>  
      <Select
     options={[
        {
          value: "asc",
          label: 'Price: Low to High',
        },
        {
          value: "desc",
          label: 'Price: High to Low',
        },      
      ]}
    defaultValue={{ value: "asc",label:"Price: Low to High"}}
    styles={customStyles}
    onChange={handleChange}
    />  
    </div>
  );
}

export default PriceSort;
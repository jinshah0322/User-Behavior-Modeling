import "./searchbar.css";
import { useDebounce } from "../../hooks/useDebounce";
// import useDebounce from "../../hooks/useDebounce";
const SearchBar = ({ setSearchItem }) => {
  // const debounceSearchWord = useDebounce(searchWord, 300);
  const handelChange = (input) => {
    setSearchItem(input.target.value);    
  };
  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." onChange={useDebounce(handelChange,1000)} />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;

import { Row } from "react-bootstrap";
import { memo, useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";

const ShopList = ({ productItems }) => {
  useEffect(() => {}, [productItems]);
  if (productItems?.length === 0) {
    return <h1 className="not-found">Product Not Found !!</h1>;
  }
  return (
    <div className="justify-content-center grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
      {productItems?.map((productItem) => {
        return (
          <ProductCard
            key={productItem.id}
            title={null}
            productItem={productItem}
          />
        );
      })}
    </div>
  );
};
export default memo(ShopList);

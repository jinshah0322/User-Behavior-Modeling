import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";
import { Link } from "react-router-dom";

const Section = ({ title, bgColor, productItems,id }) => {
  return (
    <section style={{ background: bgColor }}>
      <Container>
        <div className="flex justify-between p-3 items-center"> 
          <h1 className="font-semibold text-2xl">{title}</h1>        
          <Link to={`/shop?category=${id}`}><p className="font-semibold text-md text-blue-500 hover:cursor-pointer">View more</p></Link>
        </div>
        <div className="grid grid-cols-4 items-center justify-center gap-10">
          {productItems?.map((productItem) => {
            return (
              <ProductCard
                key={productItem._id}
                // title={title}
                productItem={productItem}
              />
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default Section;

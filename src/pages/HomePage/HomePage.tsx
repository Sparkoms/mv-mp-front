import { Helmet } from "react-helmet";
import { PageWrapper } from "../../App.styled";
import { ProductGroup, ProductGroupContainer } from "./styled";
import { dummyProducts } from "../../dummyProducts";
import ProductCard from "../../blocks/ProductCard";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Главная - MW Marketplace!</title>
      </Helmet>
      <PageWrapper>
        <ProductGroup>
          <h2>Рекомендуемые товары</h2>
          <ProductGroupContainer>
            {dummyProducts.map((product) => (
              <ProductCard
                {...product}
                key={product.id}
                // isLiked={idsInFavorites.includes(product.id)}
              />
            ))}
          </ProductGroupContainer>
        </ProductGroup>
      </PageWrapper>
    </>
  );
};

export default HomePage;

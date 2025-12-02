import { PageWrapper } from "../../App.styled";
import { ProductGroup, ProductGroupContainer } from "./styled";
import { dummyProducts } from "../../dummyProducts";
import ProductCard from "../../blocks/ProductCard";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../features/Favorites/selectors";
import { Helmet } from "react-helmet-async";

const HomePage: React.FC = () => {
  const idsInFavorites = useSelector(selectFavorites);
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
                isLiked={idsInFavorites.includes(product.id)}
              />
            ))}
          </ProductGroupContainer>
        </ProductGroup>
      </PageWrapper>
    </>
  );
};

export default HomePage;

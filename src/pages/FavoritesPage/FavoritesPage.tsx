import type React from "react";
import { selectFavorites } from "../../features/Favorites/selectors";
import { Helmet } from "react-helmet";
import { PageWrapper } from "../../App.styled";
import { ProductGroupContainer } from "./styled";
import { dummyProducts } from "../../dummyProducts";
import ProductCard from "../../blocks/ProductCard";
import { useAppSelector } from "../../store";

const FavoritesPage: React.FC = () => {
  const idsInFavorites = useAppSelector(selectFavorites);

  return (
    <>
      <Helmet>
        <title>Главная - MW Market</title>
      </Helmet>
      <PageWrapper>
        <h2>Избранное</h2>
        {idsInFavorites.length ? (
          <ProductGroupContainer>
            {dummyProducts
              .filter((p) => idsInFavorites.includes(p.id))
              .map((p) => (
                <ProductCard
                  {...p}
                  key={p.id}
                  isLiked={false}
                  hideLikes={true}
                />
              ))}
          </ProductGroupContainer>
        ) : (
          <p>Пока в избранном ничего нет</p>
        )}
      </PageWrapper>
    </>
  );
};

export default FavoritesPage;

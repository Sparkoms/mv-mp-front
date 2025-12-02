import { useCallback, useMemo } from "react";
import {
  BtnsWrapper,
  Desc,
  Image,
  LikeWrapper,
  PriceDiscounted,
  PriceRegular,
  PriceRegularWhenDiscounted,
  PriceWrapper,
  Title,
  Wrapper,
} from "./styled";
import HeartEmpty from "../../img/heart-empty.svg?react";
import HeartFilled from "../../img/heart-filled.svg?react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import { useAppDispatch } from "../../store";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../features/Favorites/reducer";
import { paths } from "../../routes/helpers";

interface I_ProductCardProps {
  id: number;
  slug?: string;
  imgSrc: string;
  priceRegular: number;
  priceDiscounted?: number;
  title: string;
  desc: string;
  isLiked: boolean;
  hideLikes?: boolean;
}

const ProductCard: React.FC<I_ProductCardProps> = ({
  id,
  slug,
  imgSrc,
  priceRegular,
  priceDiscounted,
  title,
  desc,
  isLiked,
  hideLikes = false,
}) => {
  const trimmedDesc = desc.length > 50 ? desc.slice(0, 50) + "..." : desc;
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleFavorites = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { productId } = e.currentTarget.dataset;
      dispatch(
        !isLiked
          ? addToFavorites(+productId!)
          : removeFromFavorites(+productId!)
      );
    },
    [dispatch, isLiked]
  );

  const isFavoritesPage = useMemo(
    () => location.pathname === paths.favorites,
    [location.pathname]
  );

  const removeFavorite = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      dispatch(removeFromFavorites(+e.currentTarget.dataset.productId!));
    },
    [dispatch]
  );

  return (
    <Wrapper>
      {!hideLikes && (
        <LikeWrapper data-product-id={id} onClick={handleFavorites}>
          {isLiked ? <HeartFilled /> : <HeartEmpty />}
        </LikeWrapper>
      )}

      <Link to={`/product/${slug || id}`}>
        <Image src={imgSrc} />
      </Link>

      <PriceWrapper>
        {Number.isInteger(priceDiscounted) ? (
          <>
            <PriceDiscounted>{priceDiscounted} ₽</PriceDiscounted>
            <PriceRegularWhenDiscounted>
              {priceRegular} ₽
            </PriceRegularWhenDiscounted>
          </>
        ) : (
          <PriceRegular>{priceRegular} ₽</PriceRegular>
        )}
      </PriceWrapper>
      <Title>
        <Link to={`/product/${slug || id}`}>{title}</Link>
      </Title>
      <Desc>{trimmedDesc}</Desc>

      <BtnsWrapper>
        <Button block>В корзину</Button>

        {isFavoritesPage && (
          <Button
            type="danger"
            block
            onClick={removeFavorite}
            data-product-id={id}
          >
            Удалить
          </Button>
        )}
      </BtnsWrapper>
    </Wrapper>
  );
};

export default ProductCard;

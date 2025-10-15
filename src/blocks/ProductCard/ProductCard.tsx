import { useCallback } from "react";
import {
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
import { Link } from "react-router-dom";
import Button from "../../components/Button";

interface I_ProductCardProps {
  id: number;
  slug?: string;
  imgSrc: string;
  priceRegular: number;
  priceDiscounted?: number;
  title: string;
  desc: string;
  //   isLiked: boolean;
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
  //   isLiked,
  hideLikes = false,
}) => {
  const trimmedDesc = desc.length > 50 ? desc.slice(0, 50) + "..." : desc;
  //   const dispatch = useDispatch();
  //   const handleFavorites = useCallback(
  //     (e: React.MouseEvent<HTMLElement>) => {
  //       const { productId } = e.currentTarget.dataset;
  //       dispatch(
  //         !isLiked
  //           ? addToFavorites(+productId!)
  //           : removeFromFavorites(+productId!)
  //       );
  //     },
  //     [dispatch, isLiked]
  //   );

  return (
    <Wrapper>
      {!hideLikes && (
        <LikeWrapper
          data-product-id={id}
          // onClick={handleFavorites}
        >
          {/* {isLiked ? <HeartFilled /> : <HeartEmpty />} */}
          <HeartEmpty />
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

      <Button>В корзину</Button>
    </Wrapper>
  );
};

export default ProductCard;

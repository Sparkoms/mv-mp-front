import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { I_ProductDetails } from "../types";
import { get } from "../../helpers/request";
import type { I_UniRes } from "../../types";
import { selectFavorites } from "../../features/Favorites/selectors";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../features/Favorites/reducer";
import { PageWrapper } from "../../App.styled";
import {
  Image,
  ImagesWrapper,
  InfoWrapper,
  LikeWrapper,
  PriceDiscounted,
  PriceRegular,
  PriceRegularWhenDiscounted,
  PriceWrapper,
  Wrapper,
} from "./styled";
import HeartEmpty from "./img/heart-empty.svg?react";
import HeartFilled from "./img/heart-filled.svg?react";
import { dummyProducts } from "../../dummyProducts";
import { Helmet } from "react-helmet-async";

const ProductDetailsPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const [productDetails, setProductDetails] = useState<I_ProductDetails>();

  // useEffect(() => {
  //   get(`product/${params.idOrSlug}`).then((res: I_UniRes) => {
  //     setProductDetails(res.data);
  //   });
  // }, [params.idOrSlug]);

  useEffect(() => {
    const found = dummyProducts.find((p) =>
      [String(p.id), p.slug].includes(params.idOrSlug)
    );

    if (found) setProductDetails(found);
  }, [params.idOrSlug]);

  const idsInFavorites = useAppSelector(selectFavorites);
  const isLiked = useMemo(
    () => idsInFavorites.includes(productDetails?.id!),
    [idsInFavorites, productDetails]
  );

  const handleFavorites = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { productId } = e.currentTarget.dataset;
      dispatch(
        !idsInFavorites.includes(+productId!)
          ? addToFavorites(+productId!)
          : removeFromFavorites(+productId!)
      );
    },
    [dispatch, idsInFavorites]
  );

  if (!productDetails) return null;
  const { id, imgSrc, title, desc, priceRegular, priceDiscounted } =
    productDetails;
  return (
    <>
      <Helmet>
        <title>Продукт - MW Marketplace</title>
      </Helmet>
      <PageWrapper>
        <Wrapper>
          <ImagesWrapper>
            <Image
              src={imgSrc}
              // src={`${import.meta.env.BASE_URL}/images/products/${imgSrc}`}
            />
            <LikeWrapper data-product-id={id} onClick={handleFavorites}>
              {isLiked ? <HeartFilled /> : <HeartEmpty />}
            </LikeWrapper>
          </ImagesWrapper>
          <InfoWrapper>
            <h1>{title}</h1>
            <PriceWrapper>
              {Number.isInteger(priceDiscounted) ? (
                <>
                  <PriceDiscounted>{priceDiscounted} ₽</PriceDiscounted>
                  <PriceRegularWhenDiscounted>
                    {priceRegular} ₽
                  </PriceRegularWhenDiscounted>
                </>
              ) : (
                <PriceRegular>{priceRegular}</PriceRegular>
              )}
            </PriceWrapper>
          </InfoWrapper>
        </Wrapper>
      </PageWrapper>
    </>
  );
};

export default ProductDetailsPage;

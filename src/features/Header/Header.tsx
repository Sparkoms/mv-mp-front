import { useSelector } from "react-redux";
import {
  BtnCart,
  BtnFavorites,
  BtnNotifications,
  BtnOrders,
  BtnSearch,
  Burger,
  LeftSide,
  Logo,
  RightSide,
  SearchWrapper,
  Wrapper,
} from "./styled";
import { selectIsLogged } from "../App/selectors";
import React, { useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { paths } from "../../routes/helpers";
import logoPng from "../../img/logo.png";
import Button from "../../components/Button";
import Input from "../../components/Input";
import UserDropDownMenu from "./UserDropdownMenu";

const Header: React.FC = () => {
  const location = useLocation();

  const isLogged = useSelector(selectIsLogged);

  const [searchInput, setSearchInput] = useState<string>("");
  const changeSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    []
  );

  if (
    location.pathname.includes(paths.login) ||
    location.pathname.includes(paths.register) ||
    location.pathname.includes(paths.requestPasswordRecovery) ||
    location.pathname.includes(paths.confirmPasswordRecovery)
  )
    return null;
  return (
    <Wrapper>
      <LeftSide>
        <Link to={paths.home}>
          <Logo src={logoPng} />
        </Link>
        <Button>
          <Burger>
            <div />
            <div />
            <div />
          </Burger>
          <span>Каталог</span>
        </Button>
      </LeftSide>
      <SearchWrapper>
        <Input
          value={searchInput}
          onChange={changeSearchInput}
          isGhost
          placeholder="Поиск товаров"
        />
        <BtnSearch />
      </SearchWrapper>
      <RightSide>
        {isLogged ? (
          <>
            <BtnOrders />
            <BtnFavorites />
            <BtnNotifications />
            <BtnCart />
            <UserDropDownMenu />
          </>
        ) : (
          <Link to={paths.login}>&nbsp;&nbsp;&nbsp; Войти</Link>
        )}
      </RightSide>
    </Wrapper>
  );
};

export default Header;

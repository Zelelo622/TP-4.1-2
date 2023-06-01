import React, { useContext, useState, useEffect } from "react";
import "../assets/styles/Header.css";
import { Container } from "react-bootstrap";
import {
  HOME,
  LOGIN_ROUTE,
  CART,
  PROFILE,
  SEARCH_PRODUCTS,
} from "../utils/consts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import SearchSvg from "../assets/img/icon/search.svg";
import ProfileSvg from "../assets/img/icon/profile.svg";
import CartSvg from "../assets/img/icon/cart_header.svg";
import { fetchProductByName } from "../http/productAPI";

const Header = observer(() => {
  const { user, product } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* MOBILE NAV */
  function toggleMobileNav() {
    setIsMobileNavOpen(!isMobileNavOpen);
    document.body.classList.toggle("no-scroll");
  }

  async function handleSearchSubmit(event) {
    event.preventDefault();
    const filters = { priceRange: null, isVegetarian: null, calRange: null };
    const data = await fetchProductByName(
      searchQuery,
      filters,
      product.page,
      12
    );
    navigate(`${SEARCH_PRODUCTS}?name=${searchQuery}`);
    product.setProducts(data.products.rows);
    product.setTotalCount(data.products.count);
  }

  useEffect(() => {
    const totalQuantity = Number(localStorage.getItem("totalQuantity")) || 0;
    product.setTotalQuantity(totalQuantity);
  }, []);

  const isAdminOrCourier =
    user.user.role === "ADMIN" || user.user.role === "COURIER";

  return (
    <>
      <header className="header">
        <Container>
          <div className="header__inner">
            <div className="header__left">
              <Link to={HOME} className="logo">
                DIEGO
              </Link>
              <form className="search" onSubmit={handleSearchSubmit}>
                <input
                  className="search__input"
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button className="search__btn" type="submit">
                  <img src={SearchSvg} alt="Search" />
                </button>
              </form>
            </div>
            <div className="header__right">
              <nav className="nav">
                <ul className="nav__list">
                  {user.isAuth ? (
                    <>
                      {!isAdminOrCourier && (
                        <li className="nav__item">
                          <Link to={CART}>
                            <img src={CartSvg} alt="Корзина" />
                            {product.totalQuantity > 0 && (
                              <span className="header__cart-counter">
                                {product.totalQuantity}
                              </span>
                            )}
                          </Link>
                        </li>
                      )}
                      <li className="nav__item">
                        <Link to={PROFILE + "/" + user.user.phone}>
                          <img
                            src={ProfileSvg}
                            alt="Профиль"
                            style={{ width: 28, height: 28 }}
                          />
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      {!isAdminOrCourier && (
                        <li className="nav__item">
                          <Link to={CART}>
                            <img src={CartSvg} alt="Корзина" />
                            {product.totalQuantity > 0 && (
                              <span className="header__cart-counter">
                                {product.totalQuantity}
                              </span>
                            )}
                          </Link>
                        </li>
                      )}
                      <li className="nav__item">
                        <Link to={LOGIN_ROUTE}>
                          <img
                            src={ProfileSvg}
                            alt="Профиль"
                            style={{ width: 28, height: 28 }}
                          />
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
              <button
                type="button"
                className="mobile-nav-button"
                onClick={toggleMobileNav}
              >
                <span
                  className={`mobile-nav-button__icon ${
                    isMobileNavOpen ? "active" : ""
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </Container>
      </header>
      <div className={`mobile-nav ${isMobileNavOpen ? "active" : ""}`}>
        <nav className="mobile-nav-list">
          <ul>
            {user.isAuth ? (
              <>
                {!isAdminOrCourier && (
                  <li className="mobile-nav-item">
                    <Link to={CART}>Корзина</Link>
                    {product.totalQuantity > 0 && (
                      <span className="header__cart-counter">
                        {product.totalQuantity}
                      </span>
                    )}
                  </li>
                )}
                <li>
                  <Link to={PROFILE + "/" + user.user.phone}>Профиль</Link>
                </li>
              </>
            ) : (
              <>
                {!isAdminOrCourier && (
                  <li className="mobile-nav-item">
                    <Link to={CART}>Корзина</Link>
                    {product.totalQuantity > 0 && (
                      <span className="header__cart-counter">
                        {product.totalQuantity}
                      </span>
                    )}
                  </li>
                )}
                <li>
                  <Link to={LOGIN_ROUTE}>Войти</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
});

export default Header;

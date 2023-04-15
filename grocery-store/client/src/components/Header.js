import React, { useContext, useState } from 'react';
import '../assets/styles/Header.css';
import { Container } from 'react-bootstrap';
import { HOME, LOGIN_ROUTE, CART } from "../utils/consts";
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import SearchSvg from "../assets/img/icon/search.svg";
import ProfileSvg from "../assets/img/icon/profile.svg";
import CartSvg from "../assets/img/icon/cart_header.svg";

const Header = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    /* MOBILE NAV */
    function toggleMobileNav() {
        setIsMobileNavOpen(!isMobileNavOpen);
        document.body.classList.toggle('no-scroll');
    }


    return (
        <>
            <header className="header">
                <Container>
                    <div className='header__inner'>
                        <div className="header__left">
                            <Link to={HOME} className="logo">DIEGO</Link>
                            <form className='search'>
                                <input className='search__input' type="text" placeholder="Search" />
                                <button className='search__btn' type="submit">
                                    <img src={SearchSvg} alt='Поиск' />
                                </button>
                            </form>
                        </div>
                        <div className="header__right">
                            <nav className="nav">
                                <ul className='nav__list'>
                                    {isLogin ?
                                        <>
                                            <li className='nav__item'>
                                                <Link to={CART}>
                                                    <img src={CartSvg} alt='Корзина' />
                                                </Link>
                                            </li>
                                            <li className='nav__item'>
                                                <Link to="#!">
                                                    <img src={ProfileSvg} alt='Профиль' />
                                                </Link>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li className='nav__item'>
                                                <Link to={CART}>
                                                    <img src={CartSvg} alt='Корзина' />
                                                </Link>
                                            </li>
                                            <li className='nav__item'>
                                                <Link to={LOGIN_ROUTE}>
                                                    <img src={ProfileSvg} alt='Профиль' />
                                                </Link>
                                            </li>
                                        </>
                                    }
                                </ul>
                            </nav>
                            <button type="button" className="mobile-nav-button" onClick={toggleMobileNav}>
                                <span className={`mobile-nav-button__icon ${isMobileNavOpen ? 'active' : ''}`}></span>
                            </button>
                        </div>
                    </div>
                </Container>
            </header>
            <div className={`mobile-nav ${isMobileNavOpen ? 'active' : ''}`}>

                <nav className="mobile-nav-list">
                    <ul>
                        {isLogin ?
                            <>
                                <li><Link to={CART}>Корзина</Link></li>
                                <li><Link to="#!">Профиль</Link></li>
                            </>
                            :
                            <>
                                <li><Link to={CART}>Корзина</Link></li>
                                <li><Link to={LOGIN_ROUTE}>Войти</Link></li>
                            </>
                        }
                    </ul>
                </nav>
            </div>

        </>
    )
});

export default Header;
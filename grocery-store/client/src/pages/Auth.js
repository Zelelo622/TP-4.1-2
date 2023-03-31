import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/Auth.css';
import { useLocation } from 'react-router';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';

const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    return (
        <Container>
            <div className="page-container">
                <div className="login-container">
                    <h2 className="login-header">{isLogin ? 'Войти в Diego' : 'Регистрация на Diego'}</h2>
                    <form className="login-form">
                        {isLogin ?
                            <>
                                <label className="login-label" htmlFor="phone-input">
                                    Телефон
                                </label>
                                <input className="login-input" type="tel" id="phone-input" placeholder="Введите номер телефона..." />
                                <label className="login-label" htmlFor="password-input">
                                    Пароль
                                </label>
                                <input className="login-input" type="password" id="password-input" placeholder="Введите пароль..." />
                                <button className="login-button" type="submit">
                                    Войти
                                </button>
                            </>
                            :
                            <>
                                <label className="login-label" htmlFor="name-input">
                                    Имя
                                </label>
                                <input className="login-input" type="text" id="name-input" placeholder="Введите свое имя..." />
                                <label className="login-label" htmlFor="secname-input">
                                    Фамилия
                                </label>
                                <input className="login-input" type="text" id="secname-input" placeholder="Введите свою фамилию..." />
                                <label className="login-label" htmlFor="phone-input">
                                    Телефон
                                </label>
                                <input className="login-input" type="tel" id="phone-input" placeholder="Введите номер телефона..." />
                                <label className="login-label" htmlFor="password-input">
                                    Пароль
                                </label>
                                <input className="login-input" type="password" id="password-input" placeholder="Введите пароль..." />
                                <button className="login-button" type="submit">
                                    Войти
                                </button>
                            </>
                        }
                    </form>
                    {isLogin ?
                        <p className="register-text">
                            У вас нет аккаунта?{' '}
                            <NavLink to={REGISTRATION_ROUTE} className="register-link">
                                Зарегистрироваться
                            </NavLink>
                        </p>
                        :
                        <p className="register-text">
                            У вас уже есть аккаунт?{' '}
                            <NavLink to={LOGIN_ROUTE} className="register-link">
                                Войти
                            </NavLink>
                        </p>
                    }
                </div>
            </div>
        </Container>
    );
};

export default Auth;

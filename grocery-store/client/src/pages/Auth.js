import React, { useContext, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import '../assets/styles/Auth.css'
import { useLocation } from 'react-router';
import { HOME, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [first_name, setFirstName] = useState('');
    const [second_name, setSecondName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(phone, password);
            } else {
                data = await registration(first_name, second_name, phone, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate(HOME);
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Container>
            <div className="page-container">
                <div className="login-container">
                    <div className='login-link-back'>
                        <Link to={HOME}>Назад</Link>
                    </div>
                    <h2 className="login-header">{isLogin ? 'Войти в Diego' : 'Регистрация на Diego'}</h2>
                    <form className="login-form">
                        {isLogin ?
                            <>
                                <label className="login-label" htmlFor="phone-input">
                                    Телефон
                                </label>
                                <input className="login-input" type="tel" id="phone-input" placeholder="Введите номер телефона..." value={phone} onChange={e => setPhone(e.target.value)} />
                                <label className="login-label" htmlFor="password-input">
                                    Пароль
                                </label>
                                <input className="login-input" type="password" id="password-input" placeholder="Введите пароль..." value={password} onChange={e => setPassword(e.target.value)} />
                                <button onClick={click} className="login-button" type="button">
                                    Войти
                                </button>
                            </>
                            :
                            <>
                                <label className="login-label" htmlFor="name-input">
                                    Имя
                                </label>
                                <input className="login-input" type="text" id="name-input" placeholder="Введите свое имя..." value={first_name} onChange={e => setFirstName(e.target.value)} />
                                <label className="login-label" htmlFor="secname-input">
                                    Фамилия
                                </label>
                                <input className="login-input" type="text" id="secname-input" placeholder="Введите свою фамилию..." value={second_name} onChange={e => setSecondName(e.target.value)} />
                                <label className="login-label" htmlFor="phone-input">
                                    Телефон
                                </label>
                                <input className="login-input" type="tel" id="phone-input" placeholder="Введите номер телефона..." value={phone} onChange={e => setPhone(e.target.value)} />
                                <label className="login-label" htmlFor="password-input">
                                    Пароль
                                </label>
                                <input className="login-input" type="password" id="password-input" placeholder="Введите пароль..." value={password} onChange={e => setPassword(e.target.value)} />
                                <button onClick={click} className="login-button" type="button">
                                    Зарегистрироваться
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
});

export default Auth;

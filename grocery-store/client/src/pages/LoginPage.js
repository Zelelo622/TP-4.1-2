import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/LoginPage.css'; // файл стилей

class LoginPage extends React.Component {

    render() {
        return (
            <Container>
                <div className="page-container">
                    <div className="login-container">
                        <h2 className="login-header">Войти в Diego</h2>
                        <form className="login-form">
                            <label className="login-label" htmlFor="email-input">
                                Email адрес
                            </label>
                            <input className="login-input" type="email" id="email-input" placeholder="Введите email" />
                            <label className="login-label" htmlFor="password-input">
                                Пароль
                            </label>
                            <input className="login-input" type="password" id="password-input" placeholder="Введите пароль" />
                            <button className="login-button" type="submit">
                                Войти
                            </button>
                        </form>
                        <p className="register-text">
                            У вас нет аккаунта?{' '}
                            <a href="#!" className="register-link">
                                Зарегистрироваться
                            </a>
                        </p>
                    </div>
                </div>
            </Container>
        );
    }
}

export default LoginPage;

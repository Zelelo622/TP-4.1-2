import React, { useContext, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import "../assets/styles/Auth.css";
import { useLocation } from "react-router";
import {
  HOME,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  RESET_PASS,
} from "../utils/consts";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [secondNameError, setSecondNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [secretWordError, setSecretWordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    clearError();
    if (!isLogin) {
      setSecretWord("");
      setRepeatPassword("");
    }
    setPhone("");
    setPassword("");
  }, [location.pathname, isLogin]);

  function clearError() {
    setfirstNameError("");
    setSecondNameError("");
    setPhoneError("");
    setPasswordError("");
    setRepeatPasswordError("");
    setSecretWordError("");
    setErrorMessage("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearError();

    try {
      let data;
      if (isLogin) {
        data = await login(phone, password);
      } else {
        data = await registration(
          firstName,
          secondName,
          phone,
          password,
          repeatPassword,
          secretWord
        );
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(HOME, { replace: true });
      window.location.reload();
    } catch (e) {
      if (e.response && e.response.data) {
        const errors = e.response.data;
        if (errors && errors.errors) {
          errors.errors.errors.forEach((error) => {
            switch (error.param) {
              case "first_name":
                setfirstNameError(error.msg);
                break;
              case "second_name":
                setSecondNameError(error.msg);
                break;
              case "phone":
                setPhoneError(error.msg);
                break;
              case "password":
                setPasswordError(error.msg);
                break;
              case "secret_word":
                setSecretWordError(error.msg);
                break;
              default:
                break;
            }
          });
        }
        if (errors) {
          if (errors.phone) {
            setPhoneError(errors.phone);
          }
          if (errors.password) {
            setPasswordError(errors.password);
            setRepeatPasswordError(errors.password);
          }
        }
        setErrorMessage(errors.message);
      } else {
        setErrorMessage("Что-то пошло не так");
      }
    }
  };

  return (
    <Container>
      <div className="page-container">
        <div className="login-container">
          <div className="login-link-back">
            <Link to={HOME}>Назад</Link>
          </div>
          <h2 className="login-header">
            {isLogin ? "Войти в Diego" : "Регистрация на Diego"}
          </h2>
          <Form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <>
                <Form.Group controlId="firstName" className="login-group">
                  <Form.Label className="login-label">Имя</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите свое имя..."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    isInvalid={!!firstNameError}
                    className="login-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    {firstNameError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="secondName" className="login-group">
                  <Form.Label className="login-label">Фамилия</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите свою фамилию..."
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value)}
                    isInvalid={!!secondNameError}
                    className="login-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    {secondNameError}
                  </Form.Control.Feedback>
                </Form.Group>
              </>
            )}
            <Form.Group controlId="phone" className="login-group">
              <Form.Label className="login-label">Телефон</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Введите номер телефона..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                isInvalid={!!phoneError}
                className="login-input"
              />
              <Form.Control.Feedback type="invalid">
                {phoneError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password" className="login-group">
              <Form.Label className="login-label">Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!passwordError}
                className="login-input"
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
            {!isLogin && (
              <>
                <Form.Group controlId="repeatPassword" className="login-group">
                  <Form.Label className="login-label">
                    Повторите пароль:
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Повторите пароль..."
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    isInvalid={!!repeatPasswordError}
                    className="login-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    {repeatPasswordError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="secretWord" className="login-group">
                  <Form.Label className="login-label">
                    Секретное слово
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите секретное слово..."
                    value={secretWord}
                    onChange={(e) => setSecretWord(e.target.value)}
                    isInvalid={!!secretWordError}
                    className="login-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    {secretWordError}
                  </Form.Control.Feedback>
                </Form.Group>
              </>
            )}
            <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
            <button type="submit" className="login-button">
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </button>
          </Form>
          <div className="login-bottom-text">
            {isLogin ? (
              <>
                <p className="register-text">
                  У вас нет аккаунта?{" "}
                  <NavLink to={REGISTRATION_ROUTE} className="register-link">
                    Зарегистрироваться
                  </NavLink>
                </p>
                <p className="register-text">
                  Забыли пароль?{" "}
                  <NavLink to={RESET_PASS} className="register-link">
                    Восстановить
                  </NavLink>
                </p>
              </>
            ) : (
              <p className="register-text">
                У вас уже есть аккаунт?{" "}
                <NavLink to={LOGIN_ROUTE} className="register-link">
                  Войти
                </NavLink>
              </p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
});

export default Auth;

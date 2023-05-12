import React, { useState } from "react";
import "../assets/styles/Auth.css";
import { Alert, Container, Form } from "react-bootstrap";
import { LOGIN_ROUTE } from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword, verifyAccount } from "../http/userAPI";

const PasswordReset = () => {
  const [phone, setPhone] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const navigate = useNavigate();

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSecretWordChange = (event) => {
    setSecretWord(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await verifyAccount(phone, secretWord);
      setShowNewPasswordForm(true);
      setSubmitError(null);
    } catch (error) {
      setSubmitError("Неверный номер телефона или секретное слово");
      setSuccessMessage(null);
    }
  };

  const handleNewPasswordFormSubmit = async (event) => {
    event.preventDefault();
    setPasswordError("");
    setRepeatPasswordError("");
    try {
      await resetPassword(newPassword, confirmPassword);
      setSuccessMessage("Пароль успешно изменен");
      setSubmitError(null);
      localStorage.removeItem("token");
      navigate(LOGIN_ROUTE, { replace: true });
    } catch (e) {
      if (e.response && e.response.data) {
        const errors = e.response.data;
        if (errors && errors.errors) {
          errors.errors.errors.forEach((error) => {
            switch (error.param) {
              case "password":
                setPasswordError(error.msg);
                break;
              default:
                break;
            }
          });
        }
        if (errors.password) {
          setPasswordError(errors.password);
          setRepeatPasswordError(errors.password);
        }
      }
      setSubmitError("Не удалось изменить пароль");
      setSuccessMessage(null);
    }
  };

  return (
    <Container>
      <div className="page-container">
        <div className="login-container">
          <div className="login-link-back">
            <Link to={LOGIN_ROUTE}>Назад</Link>
          </div>
          <h2 className="login-header">Востановление пароля</h2>
          {showNewPasswordForm ? (
            <Form onSubmit={handleNewPasswordFormSubmit} className="login-form">
              <Form.Group controlId="newPassword" className="login-group">
                <Form.Label className="login-label">Новый пароль:</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="login-input"
                  placeholder="Введите новый пароль..."
                  isInvalid={!!passwordError}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="login-group">
                <Form.Label className="login-label">
                  Повторите пароль:
                </Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="login-input"
                  placeholder="Повторите пароль..."
                  isInvalid={!!repeatPasswordError}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {repeatPasswordError}
                </Form.Control.Feedback>
              </Form.Group>
              <button type="submit" className="login-button">
                Изменить пароль
              </button>
              {submitError && <Alert variant="danger">{submitError}</Alert>}
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
            </Form>
          ) : (
            <Form onSubmit={handleFormSubmit} className="login-form">
              <Form.Group controlId="phone" className="login-group">
                <Form.Label className="login-label">Номер телефона:</Form.Label>
                <Form.Control
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Введите номер телефона..."
                  className="login-input"
                  required
                />
              </Form.Group>
              <Form.Group controlId="secretWord" className="login-group">
                <Form.Label className="login-label">
                  Секретное слово:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={secretWord}
                  onChange={handleSecretWordChange}
                  placeholder="Введите секретное слово..."
                  className="login-input"
                  required
                />
              </Form.Group>
              <button type="submit" className="login-button">
                Проверить данные
              </button>
              {submitError && <Alert variant="danger">{submitError}</Alert>}
            </Form>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PasswordReset;

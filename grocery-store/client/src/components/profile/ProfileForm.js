import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ProfileForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleNewPasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);
    setPasswordsMatch(value === repeatNewPassword);
  };

  const handleRepeatNewPasswordChange = (e) => {
    const { value } = e.target;
    setRepeatNewPassword(value);
    setPasswordsMatch(value === newPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (isEditingPassword && passwordsMatch) {
      onSubmit({ ...formData, password: newPassword });
      setIsEditingPassword(false);
      setShowChangePassword(false);
      setNewPassword("");
      setRepeatNewPassword("");
      setPasswordsMatch(false);
    } else if (!isEditingPassword) {
      onSubmit(formData);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  const handleCancelChangePassword = (e) => {
    e.preventDefault();
    setShowChangePassword(false);
    setNewPassword("");
    setRepeatNewPassword("");
    setPasswordsMatch(false);
  };

  return (
    <div className="profile__info">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="profile__block-info">
          <span className="profile__title">Имя:</span>
          <Form.Control
            type="text"
            placeholder="Введите имя"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="profile__block-info">
          <span className="profile__title">Фамилия:</span>
          <Form.Control
            type="text"
            placeholder="Введите фамилию"
            name="second_name"
            value={formData.second_name}
            onChange={handleChange}
          />
        </Form.Group>
        {showChangePassword ? (
          <>
            <Form.Group className="profile__block-info">
              <span className="profile__title">Новый пароль:</span>
              <Form.Control
                type="password"
                placeholder="Введите новый пароль"
                name="new_password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className={isSubmitted && !passwordsMatch ? "is-invalid" : ""}
              />
              {!passwordsMatch && (
                <Form.Control.Feedback type="invalid">
                  Пароли не совпадают
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="profile__block-info">
              <span className="profile__title">Повторите новый пароль:</span>
              <Form.Control
                type="password"
                placeholder="Повторите новый пароль"
                name="repeat_new_password"
                value={repeatNewPassword}
                onChange={handleRepeatNewPasswordChange}
                className={isSubmitted && !passwordsMatch ? "is-invalid" : ""}
              />
              {!passwordsMatch && (
                <Form.Control.Feedback type="invalid">
                  Пароли не совпадают
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <button
              type="button"
              className="profile__btn-link"
              onClick={handleCancelChangePassword}
            >
              Отменить изменение пароля
            </button>
          </>
        ) : (
          <button
            type="button"
            className="profile__btn-link"
            onClick={() => setShowChangePassword(true)}
          >
            Изменить пароль
          </button>
        )}
        <div className="profile__buttons">
          <button type="submit" className="button profile__btn-green">
            Сохранить
          </button>
          <button
            type="button"
            className="button profile__btn-grey"
            onClick={handleCancel}
          >
            Отменить
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ProfileForm;

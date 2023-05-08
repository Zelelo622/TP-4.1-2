import React, { useContext } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../utils/consts";
import { deleteUser } from "../../http/userAPI";

const ProfileData = observer(({ userData, onEdit }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    navigate(HOME);
  };

  const handleDelete = async () => {
    await deleteUser(userData.phone);
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    navigate(HOME);
  };

  return (
    <div className="profile__info">
      <div className="profile__block-info">
        <span className="profile__title">Имя:</span>
        <span className="profile__descr">{userData.first_name}</span>
      </div>
      <div className="profile__block-info">
        <span className="profile__title">Фамилия:</span>
        <span className="profile__descr">{userData.second_name}</span>
      </div>
      <div className="profile__block-info">
        <span className="profile__title">Телефон:</span>
        <span className="profile__descr">{userData.phone}</span>
      </div>
      <div className="profile__block-info">
        <span className="profile__title">Пароль:</span>
        <span className="profile__descr">**********</span>
      </div>
      <div className="profile__block-btn">
        <button className="button profile__btn-green" onClick={onEdit}>
          Редактировать
        </button>
        <button className="button profile__btn-grey" onClick={() => logOut()}>
          Выйти
        </button>
        <button
          className="button profile__btn-red"
          onClick={() => handleDelete()}
        >
          Удалить аккаунт
        </button>
      </div>
    </div>
  );
});

export default ProfileData;

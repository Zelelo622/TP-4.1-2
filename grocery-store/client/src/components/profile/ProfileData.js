import React from "react";

const ProfileData = () => {
  return (
    <div className="profile__info">
      <div className="profile__block-info">
        <span className="profile__title">Имя:</span>
        <span className="profile__descr">Егор</span>
      </div>
      <div className="profile__block-info">
        <span className="profile__title">Фамилия:</span>
        <span className="profile__descr">Кирин</span>
      </div>
      <div className="profile__block-info">
        <span className="profile__title">Телефон:</span>
        <span className="profile__descr">89046999568</span>
      </div>
      <div className="profile__block-info">
        <span className="profile__title">Пароль:</span>
        <span className="profile__descr">******</span>
      </div>
      <div className="profile__block-btn">
        <button className="button profile__btn-green">Редактировать</button>
        <button className="button profile__btn-red">Удалить аккаунт</button>
        <button className="button profile__btn-grey">Выйти</button>
      </div>
    </div>
  );
};

export default ProfileData;

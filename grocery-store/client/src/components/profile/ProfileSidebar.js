import React, { useContext } from "react";
import { PROFILE, HISTORY_ORDER, USERS } from "../../utils/consts";
import { NavLink } from "react-router-dom";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const ProfileSidebar = observer(() => {
  const { user } = useContext(Context);

  return (
    <div className="profile__sidebar">
      <NavLink
        to={PROFILE + "/" + user.user.phone}
        className={({ isActive }) =>
          isActive
            ? "profile__sidebar-link profile__sidebar-green"
            : "profile__sidebar-link"
        }
      >
        Профиль
      </NavLink>
      <NavLink
        to={HISTORY_ORDER + "/" + user.user.phone}
        className={({ isActive }) =>
          isActive
            ? "profile__sidebar-link profile__sidebar-green"
            : "profile__sidebar-link"
        }
      >
        Заказы
      </NavLink>

      {user.user.role === "ADMIN" && (
        <NavLink
          to={USERS}
          className={({ isActive }) =>
            isActive
              ? "profile__sidebar-link profile__sidebar-green"
              : "profile__sidebar-link"
          }
        >
          Пользователи
        </NavLink>
      )}
    </div>
  );
});

export default ProfileSidebar;

import React, { useContext, useState } from "react";
import { PROFILE, HISTORY_ORDER } from "../../utils/consts";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const ProfileSidebar = observer(() => {
  const [activePage, setActivePage] = useState(PROFILE);
  const { user } = useContext(Context);

  const handleLinkClick = (page) => {
    setActivePage(page);
  };

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
    </div>
  );
});

export default ProfileSidebar;

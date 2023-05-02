import React, { useState } from "react";
import { PROFILE, HISTORY_ORDER } from "../../utils/consts";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  const [activePage, setActivePage] = useState(PROFILE);

  const handleLinkClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="profile__sidebar">
      <Link
        to={PROFILE}
        onClick={() => handleLinkClick(PROFILE)}
        className={`profile__sidebar-link ${
          activePage === PROFILE ? "profile__sidebar-green" : ""
        }`}
      >
        Профиль
      </Link>
      <Link
        to={HISTORY_ORDER}
        onClick={() => handleLinkClick(HISTORY_ORDER)}
        className={`profile__sidebar-link ${
          activePage === HISTORY_ORDER ? "profile__sidebar-green" : ""
        }`}
      >
        Заказы
      </Link>
    </div>
  );
};

export default ProfileSidebar;

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileData from "../components/profile/ProfileData";
import ProfileForm from "../components/profile/ProfileForm";
import "../assets/styles/Profile.css";
import { useParams } from "react-router-dom";
import { fetchOneUser, updateUser } from "../http/userAPI";

const Profile = () => {
  const { phone } = useParams();
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchOneUser(phone).then((data) => {
      setUserData(data);
    });
  }, [phone]);

  const handleEdit = async (updatedUser) => {
    const newData = await updateUser(userData.phone, updatedUser);
    setUserData(newData);
    setEditing(false);
    window.location.reload();
  };

  return (
    <>
      <div className="container-page">
        <Header />

        <main className="main">
          <div className="profile">
            <Container>
              <div className="profile__inner">
                <ProfileSidebar />
                {editing ? (
                  <ProfileForm
                    initialData={userData}
                    onSubmit={handleEdit}
                    onCancel={() => setEditing(false)}
                  />
                ) : (
                  <ProfileData
                    userData={userData}
                    onEdit={() => setEditing(true)}
                  />
                )}
              </div>
            </Container>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Profile;

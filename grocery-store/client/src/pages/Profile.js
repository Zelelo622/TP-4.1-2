import React from "react";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileData from "../components/profile/ProfileData";
import "../assets/styles/Profile.css";

const Profile = () => {
  return (
    <>
      <div className="container-page">
        <Header />

        <main className="main">
          <div className="profile">
            <Container>
              <div className="profile__inner">
                <ProfileSidebar />
                <ProfileData />
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

import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import UsersTable from "../components/adminOnly/UsersTable";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { fetchAll } from "../http/userAPI";
import PageUsers from "../components/adminOnly/PageUsers";

const AdminUsers = observer(() => {
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const data = await fetchAll(user.page, 6);
        user.setUsers(data.rows);
        user.setTotalCount(data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, [user.page]);

  return (
    <>
      <div className="container-page">
        <Header />
        <main className="main">
          <Container>
            <div className="profile__inner">
              <ProfileSidebar />
              <div className="table-container">
                <UsersTable user={user} />
                <PageUsers />
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
});

export default AdminUsers;

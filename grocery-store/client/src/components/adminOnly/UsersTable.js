import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { deleteUser, deleteUserForAdmin, updateUser } from "../../http/userAPI";

const UsersTable = observer(({ user }) => {
  const startIndex = (user.page - 1) * user.limit;

  const handleRoleChange = async (e, phone) => {
    const newRole = e.target.value;
    try {
      await updateUser(phone, { role: newRole });
      const updatedUsers = user.users.map((userItem) => {
        if (userItem.phone === phone) {
          return { ...userItem, role: newRole };
        }
        return userItem;
      });
      user.setUsers(updatedUsers);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletePhone, setDeletePhone] = useState(null);

  const handleDeleteUser = (phone) => {
    setDeletePhone(phone);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUserForAdmin(deletePhone);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <>
      <Table className="table-order">
        <thead>
          <tr>
            <th className="table-order__title">#</th>
            <th className="table-order__title">Имя пользователя</th>
            <th className="table-order__title">Телефон</th>
            <th className="table-order__title">Роль</th>
            <th className="table-order__title"></th>
            <th className="table-order__title"></th>
          </tr>
        </thead>
        <tbody>
          {user.users.map((userItem, index) => {
            const userIndex = startIndex + index + 1;
            return (
              <tr key={userItem.id} className="table-order__row">
                <td className="table-order__data">{userIndex}</td>
                <td className="table-order__data table-order__data--name">
                  {userItem.first_name} {userItem.second_name}
                </td>
                <td className="table-order__data">{userItem.phone}</td>
                <td className="table-order__data table-order__data--role">
                  <Form.Select
                    value={userItem.role}
                    onChange={(e) => handleRoleChange(e, userItem.phone)}
                  >
                    <option key="USER" value="USER">
                      Пользователь
                    </option>
                    <option key="COURIER" value="COURIER">
                      Курьер
                    </option>
                  </Form.Select>
                </td>
                <td className="table-order__data">
                  {confirmDelete && deletePhone === userItem.phone ? (
                    <>
                      <span>Вы уверены?</span>
                      <Button
                        className="mx-2"
                        variant="danger"
                        onClick={handleConfirmDelete}
                      >
                        Да
                      </Button>
                      <Button
                        className="mx-2"
                        variant="secondary"
                        onClick={handleCancelDelete}
                      >
                        Отмена
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(userItem.phone)}
                    >
                      Удалить
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
});

export default UsersTable;

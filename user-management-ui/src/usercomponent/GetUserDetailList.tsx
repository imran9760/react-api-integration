import { useEffect, useState } from "react";
import type { UserRequest } from "./UserRequest";
import { deleteUser, getAllUsers, updateUser } from "./ApiEndpoints";
import Navbar from "./Navbar";

const GetUserDetailList = () => {
  // Simulated user data
  const [users, setUsers] = useState<UserRequest[]>([]);
  const [editUser, setEditUser] = useState<UserRequest | null>(null);

  const loadUsersDetails = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  const handleDelete = async (username: string) => {
    await deleteUser(username);
    loadUsersDetails(); // Refresh list
  };

  const handleEdit = (user: UserRequest) => {
    setEditUser({ ...user });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editUser) {
      setEditUser({ ...editUser, [e.target.name]: e.target.value });
    }
  };
  const handleUpdate = async () => {
    if (editUser) {
      await updateUser(editUser);
      setEditUser(null);
      loadUsersDetails();
    }
  };
  useEffect(() => {
    loadUsersDetails();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>User List</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Role</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.username}>
                <td>
                  {editUser?.username === user.username ? (
                    <input
                      name="username"
                      value={editUser.username}
                      onChange={handleEditChange}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editUser?.username === user.username ? (
                    <input
                      name="password"
                      value={editUser.password}
                      onChange={handleEditChange}
                    />
                  ) : (
                    user.password
                  )}
                </td>
                <td>
                  {editUser?.username === user.username ? (
                    <input
                      name="role"
                      value={editUser.role}
                      onChange={handleEditChange}
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editUser?.username === user.username ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>
                        Save
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditUser(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(user)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.username!)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetUserDetailList;

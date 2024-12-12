"use client";

import { useUser } from "@/utils/UserContextProvider";
import IUser from "@/interfaces/IUser";
import "./styles.css";
import { useState } from "react";
import { getAllProfiles } from "@/api/auth";

const ProfileInfo = ({ user }: { user: IUser }) => {
  return (
    <>
      <p>User Name: {user?.username}</p>
      <p>Role: {user.roleId === 1 ? "Admin" : "User"}</p>
    </>
  );
};

const UserPage = ({ params }: { params: { username: string } }) => {
  const { user } = useUser();
  const [users, setUsers] = useState<IUser[]>([]);

  const role = user?.roleId === 1 ? "Admin" : "User";

  const onGetAllProfiles = async () => {
    let data = await getAllProfiles();
    setUsers(data.users);
  };

  return (
    <div className="full-screen-container">
      <div className="profile-content">
        <h1 className="profile-title">Profile</h1>
        <p>User Name: {user?.username}</p>
        <p>Role: {role}</p>
        <button className="get-profiles-btn" onClick={onGetAllProfiles}>
          Get All Profiles
        </button>
        {users ? (
          users.map((user, index) => {
            return <ProfileInfo user={user} key={index} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserPage;

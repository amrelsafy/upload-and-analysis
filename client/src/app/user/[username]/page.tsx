"use client";

import { useUser } from "@/utils/UserContextProvider";
import IUser from "@/interfaces/IUser";
import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import { getAllProfiles } from "@/api/auth";
import Dropzone, { useDropzone } from "react-dropzone";
import { uploadFiles } from "@/api/file";
import FilesTable from "@/components/FilesTable";
import { redirect } from "next/navigation";
import UsersTable from "@/components/UsersTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPage = ({ params }: { params: { username: string } }) => {
  const { user } = useUser();

  const role = user?.roleId === 1 ? "Admin" : "User";

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (user) await uploadFiles(acceptedFiles, user?.id);
  }, []);

  const { getInputProps, acceptedFiles, getRootProps, isDragActive } =
    useDropzone({ onDrop });

  useEffect(() => {
    if (!user) redirect("/");
    else toast.success("User successfully logged in");
  }, []);

  return (
    <div className="full-screen-container">
      <div className="profile-content">
        <h1 className="profile-title">Profile</h1>
        <p>User Name: {user?.username}</p>
        <p>Role: {role}</p>

        <div className="drag-files-container" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="50"
                width="50"
                fill="currentColor"
              >
                <path d="M1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811L7 21C3.64378 20.7257 1 17.9216 1 14.5ZM16.8483 18.9868C19.1817 18.8093 21 16.8561 21 14.5C21 12.927 20.1884 11.4962 18.8771 10.6781L18.0714 10.1754L17.9517 9.23338C17.5735 6.25803 15.0288 4 12 4C8.97116 4 6.42647 6.25803 6.0483 9.23338L5.92856 10.1754L5.12288 10.6781C3.81156 11.4962 3 12.927 3 14.5C3 16.8561 4.81833 18.8093 7.1517 18.9868L7.325 19H16.675L16.8483 18.9868ZM13 13V17H11V13H8L12 8L16 13H13Z"></path>
              </svg>
            </div>
          ) : (
            <div>Drop your files to upload here, or click to browse</div>
          )}
        </div>
        {user?.roleId === 1 && <UsersTable />}
        {user && <FilesTable user={user} />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserPage;

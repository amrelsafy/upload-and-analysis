import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IFileMetadata from "@/interfaces/IFileMetadata";
import IUser from "@/interfaces/IUser";
import { useEffect, useState } from "react";

import "./UsersTable.css";
import { getAllProfiles } from "@/api/auth";

export default function UsersTable() {
  const [rows, setRows] = useState<IUser[]>([]);

  const fetchUsersdata = async () => {
    let data = await getAllProfiles();
    setRows(data.users);
  };

  useEffect(() => {
    fetchUsersdata();
  }, []);

  return (
    <>
      <h2 className="users-title">Users</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.roleId === 1 ? "Admin" : "User"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

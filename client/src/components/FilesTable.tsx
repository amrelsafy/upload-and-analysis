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
import { getFileMetadata } from "@/api/file";
import "./FilesTable.css";

export default function BasicTable({ user }: { user: IUser }) {
  const [rows, setRows] = useState<IFileMetadata[]>([]);

  const fetchFileMetadata = async () => {
    let data = await getFileMetadata(user.id);
    let metadata = [];
    for (let row of data) {
      metadata.push(row.metadata);
    }
    console.log(metadata);
    setRows(metadata);
  };

  useEffect(() => {
    fetchFileMetadata();
  }, []);

  return (
    <>
      <h2 className="files-title">Files</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell align="right">File Size</TableCell>
              <TableCell align="right">File Type</TableCell>
              <TableCell align="right">Upload Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.fileName}
                </TableCell>
                <TableCell align="right">{row.fileSize}</TableCell>
                <TableCell align="right">{row.fileType}</TableCell>
                <TableCell align="right">{row.uploadDate.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

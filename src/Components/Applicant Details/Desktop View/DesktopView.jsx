import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import "./DesktopView.css";
import {
  DeleteApplicantDetails,
  GetApplicantDetails,
} from "../../GlobalConstant";
import { useEffect } from "react";

export default function StickyHeadTable({
  setEditDetails,
  editDetails,
  fetchedDetails,
  setFetchedDetails,
}) {
  // TO EMPTY THE FORM FIELDS AFTER DELETING THE APPLICANT DETAILS WHICH IS STILL HAVING EDIT FORM ACTIVE
  const ApplicantDetails = {
    name: "",
    countryCode: "",
    mobileNum: "",
    email: "",
    jobType: "",
    dob: "",
    prefLocation: [],
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // TO GET THE APPLICANT DETAILS EVERY TIME THE PAGE RELOADS
  useEffect(() => GetApplicantDetails(setFetchedDetails), [setFetchedDetails]);

  const columns = [
    { id: "name", label: "Name", align: "center", minWidth: 100 },
    { id: "email", label: "E-Mail", align: "center", minWidth: 100 },
    {
      id: "mobileNum",
      label: "MobileNum",
      minWidth: 70,
      align: "center",
    },
    {
      id: "dob",
      label: "DOB",
      minWidth: 50,
      align: "center",
    },
    {
      id: "jobType",
      label: "Job Type",
      minWidth: 50,
      align: "center",
    },

    {
      id: "action",
      label: "Action",
      minWidth: 120,
      align: "center",
    },
  ];

  // ADDING FETCHED DETAILS OF APPLICANT FROM DATABASE TO THE TABLE
  const rows = fetchedDetails ? [...fetchedDetails] : [];

  return (
    <section className="table_mainCntr">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, i) => (
                  <TableCell
                    key={i}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      id={row._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={i}
                    >
                      {columns.map((column, i) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={i} align={column.align}>
                            {column.id === "action" ? (
                              <div>
                                <Button
                                  onClick={() => setEditDetails(row)}
                                  style={{ fontSize: "12px" }}
                                  className="editBtn btnAnim"
                                  variant="contained"
                                >
                                  Edit
                                </Button>

                                <Button
                                  onClick={() => {
                                    if (editDetails) {
                                      setEditDetails(ApplicantDetails);
                                    }
                                    DeleteApplicantDetails(
                                      row._id,
                                      setFetchedDetails
                                    );
                                  }}
                                  style={{
                                    marginLeft: "10px",
                                    fontSize: "12px",
                                  }}
                                  className="deleteBtn btnAnim"
                                  variant="contained"
                                >
                                  Delete
                                </Button>
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </section>
  );
}
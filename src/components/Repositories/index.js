import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import "./index.css";

function renderData(data) {
  return data.map((repository, key) => {
    const {
      branches_url,
      default_branch,
      description,
      id,
      language,
      name,
    } = repository;
    return (
      <TableRow key={id}>
        <TableCell>{name}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{default_branch}</TableCell>
        <TableCell>{language}</TableCell>
        <TableCell>{branches_url}</TableCell>
      </TableRow>
    );
  });
}

function Repositories(props) {
  const { repositories } = props;
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const paginatedData = repositories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <section className="repositories">
      <h2>Public Repositories</h2>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Default Branch</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Branch URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderData(paginatedData)}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={repositories.length}
        onChangePage={handleChangePage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]}
      />
    </section>
  );
}

export default Repositories;

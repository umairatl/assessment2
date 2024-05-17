import { UserAnalysis } from "@/interface/userDetails";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useEffect, useState } from "react";

function createData(
  HRVDate: string,
  VitalzScore: string,
  ScoreType: string,
  StressorIndex: string
) {
  return { HRVDate, VitalzScore, ScoreType, StressorIndex };
}

const UserAnalysisTable = ({ data }: { data: UserAnalysis[] }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getRows = () => {
      let data2: any[] = [];
      for (let x of data) {
        data2.push(
          createData(x.HRVDate, x.ScoreType, x.StressorIndex, x.VitalzScore)
        );
      }
      setRows(data2);
    };

    getRows();
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>HRV Date</TableCell>
            <TableCell>Vitalz Score</TableCell>
            <TableCell>Score Type</TableCell>
            <TableCell>Stressor Index</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.HRVDate}</TableCell>
              <TableCell>{row.VitalzScore}</TableCell>
              <TableCell>{row.ScoreType}</TableCell>
              <TableCell>{row.StressorIndex}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default UserAnalysisTable;

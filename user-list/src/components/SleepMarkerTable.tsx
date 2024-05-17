import {
  formatTime,
  handleChangePage,
  handleChangeRowsPerPage,
} from "@/utils/pagination";
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
  SleepOnset: string,
  WakeUpTime: string,
  Awake: string,
  Light: string,
  Deep: string
) {
  return { HRVDate, SleepOnset, WakeUpTime, Awake, Light, Deep };
}

const SleepMarkerTable = (props: any) => {
  const { data } = props || [];
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getRows = () => {
      let tableData: any[] = [];
      for (let x of data) {
        tableData.push(
          createData(
            x.HRVDate,
            formatTime(x?.SleepOnset),
            formatTime(x?.WakeUpTime),
            x.Awake,
            x.Light,
            x.Deep
          )
        );
      }
      setRows(tableData);
    };

    getRows();
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ fontWeight: "bold" }}>
            <TableCell>HRV Date</TableCell>
            <TableCell>Sleep Onset</TableCell>
            <TableCell>Wake Up Time</TableCell>
            <TableCell>Awake</TableCell>
            <TableCell>Light</TableCell>
            <TableCell>Deep</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.HRVDate}</TableCell>
              <TableCell>{row.SleepOnset}</TableCell>
              <TableCell>{row.WakeUpTime}</TableCell>
              <TableCell>{row.Awake}</TableCell>
              <TableCell>{row.Light}</TableCell>
              <TableCell>{row.Deep}</TableCell>
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
              onPageChange={(event, newPage) =>
                handleChangePage(event, newPage, setPage)
              }
              onRowsPerPageChange={(event) =>
                handleChangeRowsPerPage(event, setRowsPerPage, setPage)
              }
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default SleepMarkerTable;

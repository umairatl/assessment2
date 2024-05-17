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
import { makeStyles } from "tss-react/mui";
import { parseISO, format } from "date-fns";

interface SleepData {
  HRVDate: string;
  SleepOnset: string;
  WakeUpTime: string;
  Awake: string;
  Light: string;
  Deep: string;
}

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

const useStyles = makeStyles()((theme) => ({
  tableContainer: {
    minWidth: 650,
    maxHeight: 400,
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      minWidth: 100,
    },
  },
}));

const SleepMarkerTable = (props: any) => {
  const { data } = props || [];
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { classes } = useStyles();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const formatTime = (dateString: any) => {
    if (!dateString) {
      return "Invalid date";
    }
    const date = parseISO(dateString);
    return format(date, "HH:mm:ss");
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
      setRows(data2);
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

export default SleepMarkerTable;

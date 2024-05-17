import { parseISO, format } from "date-fns";

export const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
    setPage: (page: number) => void
  ) => {
    setPage(newPage);
  };

  export const formatTime = (dateString: any) => {
    if (!dateString) {
      return "Invalid date";
    }
    const date = parseISO(dateString);
    return format(date, "HH:mm:ss");
  };

 export const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setRowsPerPage: (value: number) => void,
    setPage: (page: number) => void
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
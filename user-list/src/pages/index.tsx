import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { makeStyles } from "tss-react/mui";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const baseURL =
  "https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserList";

interface UserData {
  UserName: string;
  UserID: number;
  DeviceCompany: string;
}

const useStyles = makeStyles()((theme) => ({
  wrapLayout: {
    // background:
    //   "radial-gradient(circle, rgba(249,179,74,1) 0%, rgba(228,217,188,1) 100%)",
    // minHeight: "100vh",
  },
  box: {
    width: "90%",
    height: "100%",
    marginTop: "4rem",
    background: "white",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
      width: "95%",
    },
  },
  wrapPaper: {
    cursor: "pointer",
    minHeight: "6rem",
    padding: "2rem",
    "&:hover": {
      border: "2px solid #e5840d",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "2rem",
    },
  },
}));

export default function Home() {
  const [list, setList] = useState<UserData[]>([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const router = useRouter();
  const { classes } = useStyles();

  const handleCardClick = (cardId: any) => {
    setSelectedCard(cardId);
  };

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setList(response.data);
    });
  }, []);

  const viewDetails = () => {
    if (selectedCard) {
      router.push(`daily-statistics/${selectedCard}`);
    }
  };

  return (
    <Grid container justifyContent="center" className={classes.wrapLayout}>
      <Box className={classes.box}>
        <Grid
          container
          direction="column"
          p={{ lg: 15, md: 15, sm: 5, xs: 5 }}
          justifyContent="space-between"
        >
          <Typography variant="h4">Select a user</Typography>
          <Typography variant="subtitle1">
            Dive into the world of insights for user daily statistics by
            selecting an intrepid explorer
          </Typography>
          {!list ? (
            <CircularProgress />
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              mt={6}
              rowGap={3}
            >
              {list &&
                list.map((x, index) => (
                  <Grid item key={index} xs={12} md={3.5} sx={{}}>
                    <Paper
                      onClick={() => handleCardClick(x.UserID)}
                      className={classes.wrapPaper}
                      sx={{
                        background:
                          selectedCard === x.UserID ? "#f9b34a" : "white",
                        border:
                          selectedCard === x.UserID
                            ? "2px solid #e5840d"
                            : "2px solid white",
                      }}
                    >
                      <PersonOutlineIcon fontSize="large" />
                      <Typography variant="subtitle2">
                        Username: <b> {x.UserName} </b>
                      </Typography>
                      <Typography variant="subtitle2">
                        Device Company: <b>{x.DeviceCompany}</b>
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          )}

          <Stack width="100%" alignItems="flex-end">
            <Button
              onClick={viewDetails}
              sx={{
                width: "fit-content",
                marginBottom: "1rem",
                color: "#f9b34a",
                borderRadius: "1rem",
                padding: "0.8rem 1.2rem",
                marginTop: "3rem",
                "&: hover": {
                  background: "#f9b34a",
                  color: "white",
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              View Details
            </Button>
          </Stack>
        </Grid>
      </Box>
    </Grid>
  );
}

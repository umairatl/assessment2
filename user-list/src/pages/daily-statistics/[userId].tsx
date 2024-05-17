import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import dynamic from "next/dynamic";
import { makeStyles } from "tss-react/mui";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SleepMarkerTable = dynamic(
  async () => await import("../../components/SleepMarkerTable"),
  {
    ssr: false,
  }
);

const UserAnalysisTable = dynamic(
  async () => await import("../../components/UserAnalysisTable"),
  {
    ssr: false,
  }
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles()((theme) => ({
  wrapLayout: {
    background:
      "radial-gradient(circle, rgba(249,179,74,1) 0%, rgba(228,217,188,1) 100%)",
    minHeight: "100vh",
  },
  box: {
    width: "90%",
    height: "95%",
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

const UserDailyStatistics = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [sleepMarkerData, setSleepMarkerData] = useState([]);
  const [userAnalysisData, setUserAnalysisData] = useState([]);
  const [value, setValue] = useState(0);
  const { classes } = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getUserSleepMarkerData = () => {
    axios
      .get(
        `https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserSleepMarker?userID=${userId}`
      )
      .then((response) => {
        if (response.status === 200) {
          setSleepMarkerData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching sleep marker data:", error);
      });
  };

  const getUserAnalysisData = () => {
    axios
      .get(
        `https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserAnalysis?userID=${userId}`
      )
      .then((response) => {
        if (response.status === 200) {
          setUserAnalysisData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching sleep analysis data:", error);
      });
  };

  useEffect(() => {
    getUserSleepMarkerData();
    getUserAnalysisData();
  }, [userId]);

  return (
    <Grid container justifyContent="center" className={classes.wrapLayout}>
      <Box className={classes.box}>
        <Grid
          container
          direction="column"
          p={{ lg: 13, md: 15, sm: 5, xs: 5 }}
          justifyContent="space-between"
        >
          <Button
            href="/"
            sx={{
              width: "fit-content",
              marginBottom: "1rem",
              color: "#f9b34a",
              borderRadius: "1rem",
              padding: "0.8rem 1.2rem",
              "&: hover": {
                background: "#f9b34a",
                color: "white",
              },
            }}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          <Typography variant="h4">User Daily Statistics</Typography>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginTop: 3,
              color: "#f9b34a",
              "& .Mui-selected": {
                color: "#f9b34a !important",
              },
              " & .MuiTabs-indicator": {
                background: "#f9b34a",
                color: "#f9b34a",
              },
            }}
          >
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="User Sleep Marker" {...a11yProps(0)} />
              <Tab label="User Analysis" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {sleepMarkerData.length !== 0 && (
              <SleepMarkerTable data={sleepMarkerData} />
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {userAnalysisData.length !== 0 && (
              <UserAnalysisTable data={userAnalysisData} />
            )}
          </CustomTabPanel>
        </Grid>
      </Box>
    </Grid>
  );
};

export default UserDailyStatistics;

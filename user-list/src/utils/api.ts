import axios from "axios";

export const getUserList = (setList: (data: any[]) => void) => {
    axios
      .get(
        `https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserList`
      )
      .then((response) => {
        if (response.status === 200) {
            setList(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  };


export const getUserSleepMarkerData = (setSleepMarkerData: (data: any[]) => void, userId: string) => {
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

 export const getUserAnalysisData = (setUserAnalysisData: (data: any[]) => void, userId: string) => {
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

import axios from "axios";
import { auth } from "../../firebase/firebase";
import { CustomActivity } from "../components/Activity";

export function getUserSavedActivities() {
  return axios.get<CustomActivity[]>(
    `http://localhost:3000/users/find-activities-by-user-uid/${auth.currentUser?.uid}`
  );
}

export function deleteActivityFromUser(activityId: string) {
  return axios.delete<CustomActivity>(
    `http://localhost:3000/users/delete-activity-from-user/${auth.currentUser?.uid}`,
    {
      data: { activityId: activityId },
    }
  );
}

export function getNewRandomActivitiesByKeyword(query: string) {
  return axios.get<CustomActivity[]>(
    `https://hobbie-api-project.onrender.com/activity/get-activity-by-type/${query}`
  );
}

export function getNewRandomActivities() {
  return axios.get<CustomActivity[]>(
    "https://hobbie-api-project.onrender.com/activity/get-a-few-activities"
  );
}

import axios from "axios";
import { auth } from "../../firebase/firebase";
import { CustomActivity } from "../components/Activity";

export function getUserSavedActivities() {
  return axios.get<CustomActivity[]>(
    `http://localhost:3000/users/find-activities-by-user-uid/${auth.currentUser?.uid}`, 
    
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

export function getNewRandomActivitiesByKeyword(query: string, token: string) {
  return axios.get<CustomActivity[]>(
    `http://localhost:3000/api/activity/random-with-query/${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getNewRandomActivities() {
  return axios.get<CustomActivity[]>(
    "http://localhost:3000/api/activity/random"
  );
}

import axios from "axios";
import { auth } from "../../firebase/firebase";
import { CustomActivity } from "../components/Activity";

export function getUserSavedActivities(token: string) {
  return axios.get<CustomActivity[]>(
    `http://localhost:3000/api/user/get-activities-by-user/${auth.currentUser?.uid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function deleteActivityFromUser(activityId: string, token: string) {
  return axios.delete(
    `http://localhost:3000/api/user/remove-activity-from-user/${auth.currentUser?.uid}?activityId=${activityId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getNewRandomActivitiesByKeyword(
  query: string,
  token: string,
  ...activity: CustomActivity[]
) {
  return axios.get<CustomActivity[]>(
    `http://localhost:3000/api/activity/random-with-query/${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getNewRandomActivities(token: string) {
  return axios.get<CustomActivity[]>(
    "http://localhost:3000/api/activity/random",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function saveActivityUser(uid: string, token: string) {
  return (
    axios.post<CustomActivity>(
      `http://localhost:3000/api/user/add-activity-to-user${uid}`
    ),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

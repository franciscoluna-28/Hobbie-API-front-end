import axios from "axios";
import { auth } from "../../firebase/firebase";

export function getUserSavedActivities(token: string, page: number) {
  return axios.get<IHobbieExploreActivityWithImage[]>(
    `http://localhost:3000/api/user/get-activities-by-user/${auth.currentUser?.uid}?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getUserSavedActivitiesIds(token: string) {
  return axios.get<any>(
    `http://localhost:3000/api/user/get-activities-ids/${auth.currentUser?.uid}`,
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

export function getNewRandomActivitiesByKeyword(query: string, token: string) {
  return axios.get<IHobbieExploreActivityWithImage[]>(
    `http://localhost:3000/api/activity/search/${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getNewRandomActivities(token: string) {
  return axios.get<IHobbieExploreActivityWithImage[]>(
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
    axios.post<IHobbieExploreActivityWithImage>(
      `http://localhost:3000/api/user/add-activity-to-user${uid}`
    ),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function searchActivityWithQuery(query: string, token: string) {
  return axios.get<IHobbieExploreActivityWithImage[]>(
    `http://localhost:3000/api/activity/search?activity=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}


export async function getActivityById(id: string, token: string) {
  try {
    const response = await axios.get<IHobbieExploreActivityWithImage>(
      `http://localhost:3000/api/activity/get-activity-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle any error that occurred during the API call
    console.error('Error fetching activity:', error);
    throw error;
  }
}

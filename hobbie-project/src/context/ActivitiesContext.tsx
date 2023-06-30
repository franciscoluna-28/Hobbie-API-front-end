import { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { CustomActivity } from "../components/Activity";
import { ActivityType } from "../components/Activity";
import axios from "axios";
import { auth } from "../../firebase/firebase";
import { useCallback } from "react";
import NotificationService from "../utils/ToastMessages";

interface ActivityContextProps {
  activities: CustomActivity[];
  currentKeyword: string;
  setCurrentKeyword: (keyword: string) => void;
  setFilteredActivities: (filteredActivities: CustomActivity[]) => void;
  isLoading: boolean;
  error: boolean;
  /*   deleteActivity: (activityId: string) => void; */
  savedActivities: CustomActivity[];
  saveActivity: (activityId: string) => void;
  filterActivities: (type: ActivityType) => void;
  filterRecommendedActivities: (type: ActivityType) => void;
  filteredActivities: CustomActivity[];
  fetchSavedActivities: () => void;
  setSavedActivities: (savedActivities: CustomActivity[]) => void;
  deleteActivity: (id: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ActivityContext = createContext<ActivityContextProps>(null!);

// TODO fix the fast refresh issue
// eslint-disable-next-line react-refresh/only-export-components
export const useActivityContext = () => useContext(ActivityContext);

interface ActivityProviderProps {
  children: React.ReactNode;
}

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [activities, setActivities] = useState<CustomActivity[]>([]);
  const [savedActivities, setSavedActivities] = useState<CustomActivity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<
    CustomActivity[]
  >([]);
  const [currentKeyword, setCurrentKeyword] = useState<string>("");

  // Getting the API response
  const { response, error, isLoading } = useFetch(
    "https://hobbie-api-project.onrender.com/activity/get-a-few-activities"
  );

  useEffect(() => {
    if (response) {
      setActivities(response.data);
    }
  }, [response]);

  useEffect(() => {
    console.log(savedActivities);
  }, [savedActivities]);

  const deleteActivity = async (activityId: string) => {
    try {
      await axios.delete(
        `http://localhost:3000/users/delete-activity-from-user/${auth.currentUser?.uid}`,
        { data: { activityId: activityId } }
      );

      const response = await axios.get(
        `http://localhost:3000/users/find-activities-by-user-uid/${auth.currentUser?.uid}`
      );

      NotificationService.error("🦄 Activity deleted successfully!");
      const activities = response.data;
      console.log(activities);
      setSavedActivities(activities);

      // Actualiza las actividades guardadas en filteredActivities
      setFilteredActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.id !== activityId)
      );
    } catch (error) {
      console.log("Error deleting activity:", error);
    }
  };

  const saveActivity = async (activityID: string) => {
    const activityToSave =
      activities.find((activity) => activity.id === activityID) ||
      filteredActivities.find((activity) => activity.id === activityID);

    try {
      await axios.post(
        `http://localhost:3000/users/add-activity-by-id/${auth.currentUser?.uid}`,
        {
          activityId: activityID,
          uid: auth.currentUser?.uid,
          activity: activityToSave?.activity,
          type: activityToSave?.type,
          price: activityToSave?.price,
          link: activityToSave?.link,
          accesibility: activityToSave?.accessibility,
          participants: activityToSave?.participants,
          image: activityToSave?.image,
          email: auth.currentUser?.email,
        }
      );

      if (activityToSave) {
        setSavedActivities((prevActivities) => [
          ...prevActivities,
          activityToSave,
        ]);
      }
    } catch (error) {
      console.log("Error saving activity:", error);
    }
  };

  // Function to filter activities based on type
  const filterActivities = (type: string) => {
    if (type === "") {
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter((activity) => activity.type === type);
      setFilteredActivities(filtered);
    }
  };

  const fetchSavedActivities = useCallback(async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/users/find-activities-by-user-uid/${auth.currentUser?.uid}`
      );

      if (response.status === 200) {
        const activities = response.data;
        setSavedActivities(activities);
      } else {
        console.error("Failed to fetch saved activities");
        // Handle the error case
      }
    } catch (error) {
      console.error("Error fetching saved activities:", error);
      // Handle the error case
    }
  }, [setSavedActivities]);

  // Function to filter recommended activities based on type
  const filterRecommendedActivities = async (type: any) => {
    let filtered: CustomActivity[] = [];
    try {
      const response = await fetch(
        `https://hobbie-api-project.onrender.com/activity/get-activity-by-type/${type}`
      );
      console.log(response);
      const data = await response.json();
      filtered = data.data;
      console.log(filtered);
      setFilteredActivities(filtered);

      console.log(filteredActivities);
    } catch (error) {
      console.log("Error while filtering activities:", error);
    }
  };

  // Context object
  const activityContextValue: ActivityContextProps = {
    activities,
    isLoading,
    error,
    savedActivities,
    saveActivity,
    filterActivities,
    filteredActivities,
    filterRecommendedActivities,
    currentKeyword,
    setCurrentKeyword,
    setFilteredActivities,
    fetchSavedActivities,
    setSavedActivities,
    deleteActivity,
  };

  return (
    // Proveemos el contexto a los componentes descendientes
    <ActivityContext.Provider value={activityContextValue}>
      {children}
    </ActivityContext.Provider>
  );
};

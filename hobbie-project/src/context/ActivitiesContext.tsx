import { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { CustomActivity } from "../components/Activity";
import { toast } from "react-toastify";

interface ActivityContextProps {
  activities: CustomActivity[];
  isLoading: boolean;
  error: boolean;
  deleteActivity: (activityId: string) => void;
  savedActivities: CustomActivity[];
  saveActivity: (activityId: string) => void;
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

  // Getting the API response
  const { response, error, isLoading } = useFetch(
    "http://localhost:3000/activity/get-a-few-activities"
  );

  useEffect(() => {
    if (response) {
      setActivities(response.data);
    }
  }, [response]);

  useEffect(() => {
    console.log(savedActivities);
  }, [savedActivities]);

  // Function to delete activity according to its id
  const deleteActivity = (activityKey: string) => {
    // TODO delete the actual activity lol
  };

  const saveActivity = (activityID: string) => {
    const activityToSave = activities.find((activity) => activity.id === activityID);
    if (activityToSave) {
      toast.success("🦄 Wow you have saved your first activity!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSavedActivities((prevActivities) => [
        ...prevActivities,
        activityToSave,
      ]);
    }

  
    console.log(savedActivities);
  };


  

  // Context object
  const activityContextValue: ActivityContextProps = {
    activities,
    isLoading,
    error,
    deleteActivity,
    savedActivities,
    saveActivity,
  };

  return (
    // Proveemos el contexto a los componentes descendientes
    <ActivityContext.Provider value={activityContextValue}>
      {children}
    </ActivityContext.Provider>
  );
};

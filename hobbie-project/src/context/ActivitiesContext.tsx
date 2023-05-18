import { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { CustomActivity } from "../components/Activities";

interface ActivityContextProps {
  activities: CustomActivity[];
  isLoading: boolean;
  error: boolean;
  deleteActivity: (activityId: number) => void;
}

const ActivityContext = createContext<ActivityContextProps | null>(null);

// TODO fix the fast refresh issue
export const useActivityContext = () => useContext(ActivityContext);

interface ActivityProviderProps{
    children: React.ReactNode
}

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [activities, setActivities] = useState<CustomActivity[]>([]);

  // Getting the API response 
  const { response, error, isLoading } = useFetch(
    "http://localhost:3000/activity/get-a-few-activities"
  );

  useEffect(() => {
    if (response) {
      setActivities(response.data);
    }
  }, [response]);

  // Function to delete activity according to its id
  const deleteActivity = (activityId: number) => {
// TODO actually delete the activity lol
  };

  // Objeto de contexto que contiene los datos y funciones necesarios
  const activityContextValue: ActivityContextProps = {
    activities,
    isLoading,
    error,
    deleteActivity,
  };

  return (
    // Proveemos el contexto a los componentes descendientes
    <ActivityContext.Provider value={activityContextValue}>
      {children}
    </ActivityContext.Provider>
  );
};

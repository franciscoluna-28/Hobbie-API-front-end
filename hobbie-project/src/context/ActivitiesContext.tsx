import { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { CustomActivity } from "../components/Activity";
import { toast } from "react-toastify";
import { ActivityType } from "../components/Activity";
import { addDoc, getDoc } from "firebase/firestore";
import { usersRef } from "../../firebase/firebase";
import { doc } from "firebase/firestore";
import { auth } from "../../firebase/firebase";
import { collection } from "firebase/firestore";
import { query } from "firebase/firestore";
import { where } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { updateDoc } from "firebase/firestore";

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

  // Function to delete activity according to its id
  /*   const deleteActivity = (activityKey: string) => {
    // TODO delete the actual activity lol
  }; */

  const saveActivity = async (activityID: string) => {
    const activityToSave =
      activities.find((activity) => activity.id === activityID) ||
      filteredActivities.find((activity) => activity.id === activityID);

      

    console.log(activityToSave);

    if (activityToSave) {
      toast.success("🦄 Wow you have saved a new activity!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // eslint-disable-next-line prefer-const
      let myObject: any = {
        id: ""
      };

      const currentUserDocument = query(
        usersRef,
        where("uid", "==", auth.currentUser.uid)
      );
        
      

      const currentUserDocumentSnapshot = await getDocs(currentUserDocument);
      currentUserDocumentSnapshot.forEach((doc) => {
        myObject.id = doc.id;
        console.log(myObject)
      });

      const washingtonRef = doc(db, "users", myObject.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      activities: [{
        name: activityToSave.activity
      }]
    }
    
    
    );
    




      



      setSavedActivities((prevActivities) => [
        ...prevActivities,
        activityToSave,
      ]);
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
    /*  */
    savedActivities,
    saveActivity,
    filterActivities,
    filteredActivities,
    filterRecommendedActivities,
    currentKeyword,
    setCurrentKeyword,
    setFilteredActivities,
  };

  return (
    // Proveemos el contexto a los componentes descendientes
    <ActivityContext.Provider value={activityContextValue}>
      {children}
    </ActivityContext.Provider>
  );
};

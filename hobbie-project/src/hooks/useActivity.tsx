import { useState, useEffect } from "react";
import useActivitiesStore from "../store/activitiesStore";
import { useAuthContext } from "./useAuthContext";

export function useActivity(activityId: string) {
  const [isActivitySaved, setIsActivitySaved] = useState(false);
  const { deleteActivity, saveActivity, userSavedActivities } = useActivitiesStore();
  const { currentUser, token } = useAuthContext();

  // TODO refactor this
  const formattedToken = token || "";

  useEffect(() => {
    // Veryfing if the activity is already saved by the user
    const activityToAdd = userSavedActivities.some(
      (savedActivity) => activityId === savedActivity.activityId
    );

    // Setting the initial state either the activity is saved or not
    setIsActivitySaved(activityToAdd);
  }, [activityId, userSavedActivities]);

  const handleSaveActivity = () => {
    if (!isActivitySaved && currentUser) {
      saveActivity(currentUser?.uid, formattedToken, activityId);
      setIsActivitySaved(true);
    }
  };

  const handleDeleteActivity = () => {
    deleteActivity(activityId, formattedToken);
    setIsActivitySaved(false);
  };

  return {
    isActivitySaved,
    handleDeleteActivity,
    handleSaveActivity,
    activityId
  };
}


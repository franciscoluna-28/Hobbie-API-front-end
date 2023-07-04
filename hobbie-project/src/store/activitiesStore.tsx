import { create } from "zustand";
import { CustomActivity } from "../components/Activity";
import { deleteActivityFromUser } from "../api/activities";

type ActivitiesState = {
  recommendedActivities: CustomActivity[];
  userSavedActivities: CustomActivity[];
  setUserSavedActivities: (activities: CustomActivity[]) => void;
  setRecommendedActivities: (activities: CustomActivity[]) => void;
  deleteActivity: (activityId: string) => void;
};

const useActivitiesStore = create<ActivitiesState>((set) => ({
  recommendedActivities: [],
  userSavedActivities: [],
  setUserSavedActivities: (activities: CustomActivity[]) =>
    set({ userSavedActivities: activities }),
  setRecommendedActivities: (activities: CustomActivity[]) =>
    set({ recommendedActivities: activities }),

  deleteActivity: async (activityId: string) => {
    try {
      const response = await deleteActivityFromUser(activityId);

      if (response.status === 200) {
        set((state) => ({
          userSavedActivities: state.userSavedActivities.filter(
            (activity) => activity.id !== activityId
          ),
        }));
      }
    } catch (error) {
      console.error("Activity cannot be eliminated from user:", error);
    }
  },
}));

export default useActivitiesStore;

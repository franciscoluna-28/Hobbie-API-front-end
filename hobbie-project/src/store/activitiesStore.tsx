import { create } from "zustand";
import { deleteActivityFromUser } from "../api/activities";
import axios from "axios";
import { IActivity } from "../types/activity";
import NotificationService, { toastMessages } from "../utils/ToastMessages";

type State = {
  recommendedActivities: IActivity[];
  userSavedActivities: IActivity[];
  activitiesObtainedByQuery: IActivity[];
};

type Actions = {
  setUserSavedActivities: (activities: IActivity[]) => void;
  setRecommendedActivities: (activities: IActivity[]) => void;
  setActivitiesObtainedByQuery: (activities: IActivity[]) => void;
  deleteActivity: (activityId: string, token: string) => void;
  saveActivity: (uid: string, token: string, id: string) => void;
};

const useActivitiesStore = create<State & Actions>((set) => ({
  recommendedActivities: [],
  userSavedActivities: [],
  activitiesObtainedByQuery: [],
  setUserSavedActivities: (activities: IActivity[]) =>
    set({ userSavedActivities: activities }),
  setRecommendedActivities: (activities: IActivity[]) =>
    set({ recommendedActivities: activities }),
  setActivitiesObtainedByQuery: (activities: IActivity[]) =>
    set({ activitiesObtainedByQuery: activities }),

  deleteActivity: async (activityId: string, token: string) => {
    try {
      const response = await deleteActivityFromUser(activityId, token);
      NotificationService.success(toastMessages.sucessOnDeletingActivity);

      if (response.status === 200) {
        set((state) => ({
          userSavedActivities: state.userSavedActivities.filter(
            (activity) => activity.activityId !== activityId
          ),
        }));
      }
    } catch (error) {
      console.error("Activity cannot be eliminated from user:", error);
      NotificationService.error(toastMessages.successOnSavingActivity);
    }
  },

  saveActivity: async (uid: string, token: string, id: string) => {
    try {
      const activityToAdd = useActivitiesStore
        .getState()
        .recommendedActivities.find((activity) => activity.activityId === id);

      if (!activityToAdd) {
        console.error("Activity not found");
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/api/user/add-activity-to-user/${uid}`,
        {
          activityId: activityToAdd.activityId,
          activityName: activityToAdd.activityName,
          type: activityToAdd.type,
          participants: activityToAdd.participants,
          price: activityToAdd.price,
          accessibility: activityToAdd.accessibility,
          urls: activityToAdd.urls,
          user: activityToAdd.user,
          profile_image: activityToAdd.user.profile_image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        NotificationService.success(toastMessages.successOnSavingActivity);
        set((state) => ({
          userSavedActivities: [...state.userSavedActivities, activityToAdd],
        }));
      }
    } catch (error) {
      console.error("Activity cannot be saved:", error);
    }
  },
}));

export default useActivitiesStore;

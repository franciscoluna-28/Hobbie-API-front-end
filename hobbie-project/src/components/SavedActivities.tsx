import Activity, { CustomActivity } from "./Activity";
import { useQuery } from "react-query";
import { getUserSavedActivities } from "../api/activities";

import ActivitiesLayout from "../layouts/ActivitiesLayout";
import ActivityAnimation from "./Animation/ActivityAnimation";
import useActivitiesStore from "../store/activitiesStore";

// The activities load only once, they'll load again only if the user wants
export default function SavedActivities() {
  const deleteActivity = useActivitiesStore((state) => state.deleteActivity);
  const userSavedActivities = useActivitiesStore(
    (state) => state.userSavedActivities
  );
  const setUserActivities = useActivitiesStore(
    (state) => state.setUserSavedActivities
  );

  // We get the initial activities and save them in the global state
  const { status, error } = useQuery(
    "savedActivities",
    getUserSavedActivities,
    {
      onSuccess: (data) => {
        setUserActivities(data.data);
      },
    }
  );

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <div>
        <h1 className="text-4xl text-gray-950 font-bold mb-8">
          Saved Activities
        </h1>
        <ActivitiesLayout>
          {userSavedActivities &&
            userSavedActivities.map((activityData: CustomActivity) => (
              <ActivityAnimation activityKey={activityData.id}>
                <Activity key={activityData.id} {...activityData} />
                <button onClick={() => deleteActivity(activityData.id)}>
                  Delete Activity
                </button>
              </ActivityAnimation>
            ))}
        </ActivitiesLayout>
      </div>
    </>
  );
}

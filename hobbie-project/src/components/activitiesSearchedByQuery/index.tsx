import React from "react";
import ActivityCard from "../ui/activityCard";
import ActivitiesLayout from "../../layouts/ActivitiesLayout";
import ActivityAnimation from "../Animation/ActivityAnimation";
import { IHobbieExploreActivityWithImage } from "../../types/activity";
import useActivitiesStore from "../../store/activitiesStore";

interface RecomendedActivitiesProps {
  token: string;
}

export default function SearchedActivities() {
  const searchedActivities = useActivitiesStore(
    (state) => state.activitiesObtainedByQuery
  );

  return (
    <div>
      <h1 className="text-4xl text-gray-950 font-bold mb-8">
        Activities For You
      </h1>
      <ActivitiesLayout>
        {searchedActivities &&
          searchedActivities.map(
            (activityData: IHobbieExploreActivityWithImage) => (
              <ActivityAnimation
                activityKey={activityData.activityId}
                key={activityData.activityId}
              >
                <ActivityCard
                  {...activityData}
                  disabledFunction={() => true}
                  isActivitySaved={true}
                  saveActivity={() => console.log("uwu")}
                />
              </ActivityAnimation>
            )
          )}
      </ActivitiesLayout>
    </div>
  );
}

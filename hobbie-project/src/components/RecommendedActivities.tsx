import ActivityCard from "./activityCard";
import ActivitiesLayout from "../layouts/ActivitiesLayout";
import ActivityAnimation from "./Animation/ActivityAnimation";
import Button from "./Button";
import { AiOutlineReload } from "react-icons/ai";
import { IHobbieExploreActivityWithImage } from "../types/activity";
import { useRecommendedActivities } from "../hooks/useRecommendedActivities";

interface RecomendedActivitiesProps {
  token: string;
}

export default function RecomendedActivities({
  token,
}: RecomendedActivitiesProps) {
  const { status, error, recommendedActivities, refetchRecommendedActivities } =
    useRecommendedActivities(token);

  const handleUpdateClick = () => {
    refetchRecommendedActivities();
  };

  if (status === "loading" && !recommendedActivities) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error while loading...</h1>;
  }

  return (
    <div>
      <Button onClick={handleUpdateClick} disabled={false}>
        <AiOutlineReload className="text-accent text-2xl" />
        Get New Activities
      </Button>
      <h1 className="text-4xl text-gray-950 font-bold mb-8">
        Activities For You
      </h1>
      <ActivitiesLayout>
        {recommendedActivities &&
          recommendedActivities.data.map(
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

import Activity from "./Activity";
import { CustomActivity } from "./Activity";
import ActivitiesLayout from "../layouts/ActivitiesLayout";
import ActivityAnimation from "./Animation/ActivityAnimation";
import { useQuery } from "react-query";
import { getNewRandomActivities } from "../api/activities";
import { queryClient } from "../App";
import Button from "./Button";
import { AiOutlineReload } from "react-icons/ai";

export interface HobbieAPIResponse {
  data: CustomActivity[] | any;


}

export default function RecomendedActivities() {
  const handleUpdateClick = async () => {
    await queryClient.invalidateQueries("activities");
  };

  const {
    status,
    error,
    data: recommendedActivities,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: getNewRandomActivities,
    retry: false,
    staleTime: Infinity,
  });

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was en error while loading...</h1>;
  }

  return (
    <>
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
            recommendedActivities.data.map((activityData) => (
              <ActivityAnimation activityKey={activityData.id}>
                <Activity {...activityData} />
              </ActivityAnimation>
            ))}
        </ActivitiesLayout>
      </div>
    </>
  );
}

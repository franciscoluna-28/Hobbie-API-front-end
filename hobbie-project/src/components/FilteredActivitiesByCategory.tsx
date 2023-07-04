import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { CustomActivity } from "./Activity";
import Activity from "./Activity";
import { useActivityContext } from "../context/ActivitiesContext";
import { getNewRandomActivitiesByKeyword } from "../api/activities";

interface FilteredActivitiesByCategoryProps {
  currentKeyword: string;
  token: string;
}

export default function FilteredActivitiesByCategory({
  currentKeyword,
  token,
}: FilteredActivitiesByCategoryProps) {
  const { data: filteredActivities, isLoading, error } = useQuery<CustomActivity[]>(
    ["activities", currentKeyword, token],
    () => getNewRandomActivitiesByKeyword(currentKeyword, token),
    {
      retry: false,
      staleTime: Infinity,
    }
  );

  console.log(token)
  const { setFilteredActivities } = useActivityContext();

  useEffect(() => {
    if (filteredActivities) {
      setFilteredActivities(filteredActivities);
      console.log(filteredActivities)
    }
  }, [filteredActivities, setFilteredActivities]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error while loading...</div>;
  }

  return (
    <>
      {filteredActivities.data.map((activityData: CustomActivity) => (
        <motion.div
          key={activityData.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Activity {...activityData} key={activityData.id} />
        </motion.div>
      ))}
    </>
  );
}



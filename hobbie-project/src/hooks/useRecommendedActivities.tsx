import { useEffect } from "react";
import { useQuery } from "react-query";
import { getNewRandomActivities } from "../api/activities";
import useActivitiesStore from "../store/activitiesStore";

export function useRecommendedActivities(token: string) {
  const setRecommendedActivities = useActivitiesStore(
    (state) => state.setRecommendedActivities
  );

  const {
    status,
    error,
    data: recommendedActivities,
    refetch: refetchRecommendedActivities,
  } = useQuery("recommendedActivities", () => getNewRandomActivities(token), {
    retry: false,

    // 5 minutes
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => {
      setRecommendedActivities(data.data);
    },
  });

  useEffect(() => {
    refetchRecommendedActivities();
  }, [refetchRecommendedActivities]);

  return { status, error, recommendedActivities, refetchRecommendedActivities };
}

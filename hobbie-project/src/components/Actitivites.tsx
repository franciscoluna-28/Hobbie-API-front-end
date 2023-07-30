import { useActivityContext } from "../context/ActivitiesContext";
import FilteredActivitiesByCategory from "./FilteredActivitiesByCategory";
import RecomendedActivities from "./RecommendedActivities";
import SearchBar from "./SearchBar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSearchActivityWithQuery } from "../hooks/useSearchActivityWithQuery";
import useSearchStore from "../store/searchStore";
import SearchedActivities from "./activitiesSearchedByQuery";

export default function Activities() {
  const { currentKeyword } = useActivityContext();
  const { token } = useAuthContext();
  const currentQuery = useSearchStore((state) => state.searchActivityInput);

  const formattedToken = token || "";

  const { searchActivity, obtainedActivitiesWithQuery } = useSearchActivityWithQuery(
    formattedToken,
    currentQuery
  );

  return (
    <div className="w-full min-h-full">
      <h1 className="lg:text-6xl text-5xl text-accent font-bold mb-8 lg:flex gap-4">
        Recommended Activities
      </h1>
      <SearchBar handleSearch={searchActivity} placeholder="Search Activities..." />
      {currentQuery !== "" && obtainedActivitiesWithQuery ? (
        <SearchedActivities />
      ) : (
        <div className="flex gap-4 flex-wrap">
          {currentKeyword === "" ? (
            <RecomendedActivities token={formattedToken} />
          ) : (
            <FilteredActivitiesByCategory
              token={formattedToken}
              currentKeyword={currentKeyword}
            />
          )}
        </div>
      )}
    </div>
  );
}


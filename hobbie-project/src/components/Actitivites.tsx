import { useActivityContext } from "../context/ActivitiesContext";
import FilteredActivitiesByCategory from "./FilteredActivitiesByCategory";
import RecomendedActivities from "./RecommendedActivities";
import SearchBar from "./SearchBar";

export default function Activities() {
  const { currentKeyword } = useActivityContext();

  return (
    <div>
      <h1 className="lg:text-6xl text-5xl text-accent font-bold mb-8 lg:flex gap-4">
        Recommended Activities
      </h1>
      <SearchBar />
      <div className="flex gap-4 flex-wrap">
        {currentKeyword === "" ? (
          <RecomendedActivities />
        ) : (
          <FilteredActivitiesByCategory token={sessionStorage.getItem("accessToken")} currentKeyword={currentKeyword} />
        )}
        S
      </div>
    </div>
  );
}

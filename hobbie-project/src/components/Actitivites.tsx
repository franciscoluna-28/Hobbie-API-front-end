import { useActivityContext } from "../context/ActivitiesContext";
import CategoriesDropdown from "./CategoriesDropdown";
import FilteredActivitiesByCategory from "./FilteredActivitiesByCategory";
import RecomendedActivities from "./RecommendedActivities";

export default function Activities() {
  const { currentKeyword } = useActivityContext();
  
  return (
    <div>
      <h1 className="text-4xl text-gray-950 font-bold mb-8">Recommended Activities</h1>
      <CategoriesDropdown />
      <div className="flex gap-4">
        {currentKeyword === "" ? (
          <RecomendedActivities />
        ) : (
          <FilteredActivitiesByCategory currentKeyword={currentKeyword} />
        )}
      </div>
    </div>
  );
}


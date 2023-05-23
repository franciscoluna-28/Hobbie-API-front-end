import { useActivityContext } from "../context/ActivitiesContext";
import CategoriesDropdown from "./CategoriesDropdown";
import FilteredActivitiesByCategory from "./FilteredActivitiesByCategory";
import RecomendedActivities from "./RecommendedActivities";

export default function Activities() {
  const { currentKeyword } = useActivityContext();
  
  return (
    <div className="p-8">
      <h2 className="text-6xl text-accent font-bold mb-8 flex gap-4">Recommended <h1 className="flex text-main">Activities</h1></h2>
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


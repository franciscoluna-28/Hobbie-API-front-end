import { useActivityContext } from "../context/ActivitiesContext";
import 'react-toastify/dist/ReactToastify.css';
import Activity from "./Activity";
import { CustomActivity } from "./Activity";
import CategoriesDropdown from "./CategoriesDropdown";

export interface HobbieAPIResponse {
  data: CustomActivity[]
}

export default function RecomendedActivities() {
  const { isLoading, error, activities } = useActivityContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error while loading...</div>;
  }

  return (
    <div>
             <div className="flex gap-4">
        {activities.map((activityData: CustomActivity) => (
          <Activity {...activityData} key={activityData.id} />
        ))}
      </div>
      </div>

  );
  
}

import useFetch from "../hooks/useFetch"
import { useEffect, useState } from "react"
import { CustomActivity } from "./Activity";
import CategoriesDropdown from "./CategoriesDropdown";
import Activity from "./Activity";



interface FilteredActivitiesByCategoryProps{
    currentKeyword: string;
}

export default function FilteredActivitiesByCategory({currentKeyword}: FilteredActivitiesByCategoryProps){
    const { response, error, isLoading } = useFetch(`http://localhost:3000/activity/get-activity-by-type/${currentKeyword}`)
    const [ filteredActivities, setFilteredActivities] = useState<any>([])

    useEffect(() => {
        if (response) {
          setFilteredActivities(response.data);
          console.log(filteredActivities);
        }
      }, [filteredActivities, response]);


    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>There was an error while loading...</div>;
      }

    return(
        <>

          {filteredActivities.map((activityData: CustomActivity) => (
            <Activity {...activityData} key={activityData.id} />
          ))}
      </>
    )
}
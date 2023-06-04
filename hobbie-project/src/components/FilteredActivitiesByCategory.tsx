import useFetch from "../hooks/useFetch"
import { useEffect, useState } from "react"
import { CustomActivity } from "./Activity";
import Activity from "./Activity";
import { motion } from "framer-motion";
import { useActivityContext } from "../context/ActivitiesContext";



interface FilteredActivitiesByCategoryProps{
    currentKeyword: string
}

export default function FilteredActivitiesByCategory({currentKeyword}: FilteredActivitiesByCategoryProps){
    const { response, error, isLoading } = useFetch(`http://localhost:3000/activity/get-activity-by-type/${currentKeyword}`)
    const {filteredActivities, setFilteredActivities} = useActivityContext();




    
    useEffect(() => {
        if (response) {
          setFilteredActivities(response.data);
          console.log(filteredActivities);
        }
      }, [filteredActivities, response, setFilteredActivities]);


    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>There was an error while loading...</div>;
      }

    return(
        <>

          {filteredActivities.map((activityData: CustomActivity) => (
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
    )
}
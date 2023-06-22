import { motion } from "framer-motion";
import { useActivityContext } from "../context/ActivitiesContext";
import "react-toastify/dist/ReactToastify.css";
import Activity from "./Activity";
import { CustomActivity } from "./Activity";
import { auth } from "../../firebase/firebase";
/* import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react" */


export interface HobbieAPIResponse {

  data: CustomActivity[];
}

export default function RecomendedActivities() {

  const { isLoading, error, activities } = useActivityContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error while loading...</div>;
  }


/*   const { response, error, isLoading } = useFetch("http://localhost:3000/activity/get-a-few-activities")
  const [ activities, setActivities] = useState<any>([])

  useEffect(() => {
      if (response) {
        setActivities(response.data);
        console.log(activities);
      }
    }, [activities, response]);


  if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>There was an error while loading...</div>;
    } */

console.log(auth.currentUser)

  return (
    <div>
      <div className="flex flex-wrap gap-4">

        {activities.map((activityData: CustomActivity) => (
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
      </div>
    </div>
  );
}

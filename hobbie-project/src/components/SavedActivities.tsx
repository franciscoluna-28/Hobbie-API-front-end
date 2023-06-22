import { useEffect, useState } from "react";
import Activity from "./Activity";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import { auth } from "../../firebase/firebase";
import { useActivityContext } from "../context/ActivitiesContext";

console.log(auth.currentUser?.uid)



export default function SavedActivities() {
  const { savedActivities, setSavedActivities } = useActivityContext();
  const { response, error, isLoading } = useFetch(
    `http://localhost:3000/users/find-activities-by-user-uid/${auth.currentUser?.uid}`
  );


  useEffect(() => {
    if (response) {
      setSavedActivities(response);
      console.log(savedActivities);
    }
  }, [savedActivities, response, setSavedActivities]);


  return (
    <>
      <div>
        <h1 className="text-4xl text-gray-950 font-bold mb-8">Saved Activities</h1>
        {isLoading ? (
          <p>Loading saved activities...</p>
        ) : error ? (
          <p>Error fetching saved activities.</p>
        ) : response.length === 0 ? (
          <p>No saved activities yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {savedActivities.map((activityData: any) => (
              <motion.div
                key={activityData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Activity {...activityData} />
                {/* <button onClick={() => deleteActivity(activityData.id)}>test</button> */}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}


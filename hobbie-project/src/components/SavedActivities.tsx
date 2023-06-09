import { useActivityContext } from "../context/ActivitiesContext"
import Activity from "./Activity";
import { CustomActivity } from "./Activity";
import { motion } from "framer-motion";




export default function SavedActivies() {
  const { savedActivities } = useActivityContext();

  return (
    <>
      <div>
        <h1 className="text-4xl text-gray-950 font-bold mb-8">Saved Activities</h1>
        {savedActivities.length === 0 ? (
          <p>No saved activities yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {savedActivities.map((activityData: CustomActivity) => (
           <motion.div
           key={activityData.id}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.3 }}
         >
                <Activity {...activityData} key={activityData.id} />
{/*                 <button onClick={() => deleteActivity(activityData.id)}>test</button> */}
</motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

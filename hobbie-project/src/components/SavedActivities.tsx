import { useActivityContext } from "../context/ActivitiesContext"
import Activity from "./Activity";
import { CustomActivity } from "./Activity";
import TempNavbar from "./tempNavbar";




export default function SavedActivies() {
  const { savedActivities, deleteActivity } = useActivityContext();

  return (
    <>
      <div>
        <TempNavbar/>
        <h1 className="text-4xl text-gray-950 font-bold mb-8">Saved Activities</h1>
        {savedActivities.length === 0 ? (
          <p>No saved activities yet.</p>
        ) : (
          <div className="flex gap-4">
            {savedActivities.map((activityData: CustomActivity) => (
              <>
                <Activity {...activityData} key={activityData.id} />
                <button onClick={() => deleteActivity(activityData.id)}>test</button>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

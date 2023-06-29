import Activity, { CustomActivity } from './Activity'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { deleteActivityFromUser, getUserSavedActivities } from '../api/activities'
import { useMutation } from 'react-query'

export default function SavedActivities () {
  const { status, error, data: savedActivities } = useQuery({
    queryKey: ["activities"],
    queryFn: getUserSavedActivities
  })

  const deleteActivity = useMutation((id: string) => {
    return deleteActivityFromUser(id);
  });

  if (status === "loading") return <h1>Loading...</h1>
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>

  return (
    <>
      <div>
        <h1 className='text-4xl text-gray-950 font-bold mb-8'>
          Saved Activities
        </h1>

        <div className='grid grid-cols-2 gap-4'>
          {savedActivities &&
            savedActivities.data.map((activityData: CustomActivity) => (
              <motion.div
                key={activityData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Activity {...activityData} />
                <button onClick={() => deleteActivity.mutate(activityData.id)}>
                  Delete Activity
                </button>
              </motion.div>
            ))}
        </div>
      </div>
    </>
  );
}

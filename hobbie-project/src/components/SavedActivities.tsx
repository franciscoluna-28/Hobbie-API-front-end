import { useEffect } from 'react'
import Activity, { CustomActivity } from './Activity'
import { motion } from 'framer-motion'
import useFetch from '../hooks/useFetch'
import { auth } from '../../firebase/firebase'
import { useActivityContext } from '../context/ActivitiesContext'

export default function SavedActivities () {
  const { savedActivities, deleteActivity } = useActivityContext()
  const { error, isLoading } = useFetch(
    `http://localhost:3000/users/find-activities-by-user-uid/${auth.currentUser?.uid}`
  )


  return (
    <>
      <div>
        <h1 className='text-4xl text-gray-950 font-bold mb-8'>
          Saved Activities
        </h1>
        {isLoading ? (
          <p>Loading saved activities...</p>
        ) : error ? (
          <p>Error fetching saved activities.</p>
        ) : savedActivities.length === 0 ? (
          <p>No saved activities yet.</p>
        ) : (
          <div className='grid grid-cols-2 gap-4'>
            {savedActivities.map((activityData: CustomActivity) => (
              <motion.div
                key={activityData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Activity {...activityData} />
                { <button onClick={() => deleteActivity(activityData.id)}>test</button>}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

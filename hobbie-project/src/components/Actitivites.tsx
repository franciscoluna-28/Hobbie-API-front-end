import { motion } from "framer-motion";
import { useActivityContext } from "../context/ActivitiesContext";
import CategoriesDropdown from "./CategoriesDropdown";
import FilteredActivitiesByCategory from "./FilteredActivitiesByCategory";
import RecomendedActivities from "./RecommendedActivities";
import Sidebar from "./Sidebar";

export default function Activities() {
  const { currentKeyword } = useActivityContext();

  return (
    <>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          
          >
          <h2 className="lg:text-6xl text-5xl text-accent font-bold mb-8 lg:flex gap-4">
            Recommended <h1 className="lg:flex text-5xl lg:text-6xl mt-4 lg:mt-0 text-main">Activities</h1>
          </h2>
          <CategoriesDropdown />
          <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentKeyword === "" ? (
              <RecomendedActivities />
            ) : (
              <FilteredActivitiesByCategory currentKeyword={currentKeyword} />
            )}
          </motion.div>
        </motion.div>
    </>
  );
}

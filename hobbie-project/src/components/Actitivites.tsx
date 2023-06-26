import { motion } from "framer-motion";
import { useActivityContext } from "../context/ActivitiesContext";
import CategoriesDropdown from "./CategoriesDropdown";
import FilteredActivitiesByCategory from "./FilteredActivitiesByCategory";
import RecomendedActivities from "./RecommendedActivities";

export default function Activities() {
  const { currentKeyword } = useActivityContext();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="lg:text-6xl text-5xl text-accent font-bold mb-8 lg:flex gap-4">
          Recommended Activities
        </h1>
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

import { motion } from "framer-motion";

interface ActivityAnimationProps {
  children: React.ReactNode;
  activityKey: string | number;
}

export default function ActivityAnimation({
  children,
  activityKey,
}: ActivityAnimationProps) {
  return (
    <motion.div
      key={activityKey}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

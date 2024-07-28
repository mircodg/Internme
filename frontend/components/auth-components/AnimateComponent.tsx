import { motion } from "framer-motion";

interface AnimateComponentProps {
  children: React.ReactNode;
  className?: string;
}

const AnimateComponent = ({ children, ...props }: AnimateComponentProps) => {
  return (
    <motion.div
      className=" w-full h-full mx-auto"
      initial={{ opacity: 0 }}
      animate={{ y: 150, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateComponent;

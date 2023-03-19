import { motion } from "framer-motion";

const Backdrop = ({ children, onClick, className = "" }) => {
    return (
        <motion.div
            onClick={onClick}
            className={`${className} fixed top-0 left-0 h-full overflow-hidden bg-black/70 z-50 p-8 px-4 outline-0 overflow-y-auto overflow-x-hidden w-full`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {children}
        </motion.div>
    );
};

export default Backdrop;

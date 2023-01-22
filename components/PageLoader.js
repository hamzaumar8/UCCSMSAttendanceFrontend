import { motion } from "framer-motion";
import { ClipLoader, ClockLoader } from "react-spinners";

const PageLoader = ({ loading }) => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <ClockLoader size={100} color="#59FFA0" loading={loading} />
        </div>
    );
};

export const SectionLoader = () => {
    return (
        <div className="flex min-h-[7rem] w-full items-center justify-center">
            <ClipLoader size={50} color="#59FFA0" loading={true} />
        </div>
    );
};

export const ModalLoader = () => {
    return (
        <motion.div
            className="fixed top-0 left-0 h-full w-full overflow-hidden bg-black/70 flex items-center justify-center z-50 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="relative rounded-lg flex flex-col justify-center bg-white w-full max-w-sm mx-6">
                <div className="flex items-center px-4 sm:px-6 py-4 space-x-4">
                    <div className="flex min-h-[7rem] w-full items-center justify-center">
                        <ClipLoader size={50} color="#59FFA0" loading={true} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PageLoader;

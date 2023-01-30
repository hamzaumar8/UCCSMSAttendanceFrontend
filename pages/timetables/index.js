import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import {
    ArrowUpTrayIcon,
    PencilIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useSemester } from "../../src/hooks/semester";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Student = () => {
    const { semester, loading } = useSemester();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    console.log(semester);
    return (
        <AppLayout header="Timetable">
            {/* Title */}
            <HeadTitle title="Timetable" />

            {/* Main Section */}
            <div className="space-y-5">
                <div className="flex items-center justify-between relative">
                    <div className="flex space-x-4 items-center">
                        <h1 className="text-black font-extrabold text-xl">
                            Semester Timetable
                        </h1>
                    </div>
                    <div className="space-x-4 flex items-center">
                        {semester?.timetable ? (
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="inline-flex items-center px-6 py-2 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150">
                                <PencilIcon className="w-4 h-4 mr-1" />
                                update
                            </motion.button>
                        ) : (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="inline-flex items-center px-6 py-2 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150">
                                    <PlusIcon className="w-4 h-4 mr-1" />
                                    Add
                                </motion.button>
                            </>
                        )}
                    </div>
                </div>

                {semester === undefined ? (
                    "loading ...."
                ) : (
                    <>
                        {semester ? (
                            <>
                                {semester?.timetable ? (
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.js">
                                        <div style={{ height: "750px" }}>
                                            <Viewer
                                                fileUrl="/pdf-open-parameters.pdf"
                                                plugins={[
                                                    defaultLayoutPluginInstance,
                                                ]}
                                            />
                                        </div>
                                    </Worker>
                                ) : (
                                    ""
                                )}
                            </>
                        ) : (
                            ""
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    );
};

export default Student;

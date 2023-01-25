import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { ArrowUpTrayIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSemester } from "../../src/hooks/semester";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
const Student = () => {
    const { semester, loading } = useSemester();

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <AppLayout header="Timetable">
            {/* Title */}
            <HeadTitle title="Timetable" />

            {/* Main Sction */}
            <div className="space-y-5">
                <div className="flex items-center justify-between relative">
                    <div className="flex space-x-4 items-center">
                        <h1 className="text-black font-extrabold text-xl">
                            Semester Timetable
                        </h1>
                    </div>
                    <div className="space-x-4 flex items-center">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="inline-flex items-center px-6 py-2 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150">
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Add Student
                        </motion.button>
                    </div>
                </div>
                <div className="my-3 overflow-x-auto bg-white shadow-lg rounded-lg overflow-y-auto">
                    <table className="table rounded-lg min-w-full border border-slate-200 transition duration-500 ease-in-out">
                        <thead className="shadow-sm bg-primary-accent border border-slate-200">
                            <tr>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    Photo
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    Index Number
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    Name
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    Group Number
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    Present(%)
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    Absents(%)
                                </th>
                                <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                            {/* {students
                                .filter(
                                    itm =>
                                        itm.level?.name == levelSelectedValue,
                                )
                                .map((student, index) => (
                                    <tr className="" key={index}>
                                        <td className="capitalize p-3 whitespace-nowrap">
                                            <Image
                                                src={student.picture}
                                                height={100}
                                                width={100}
                                                alt={student.index_number}
                                                className="w-14 h-12 my-0 mx-auto"
                                            />
                                        </td>
                                        <td className="uppercase p-3 whitespace-nowrap border-b">
                                            <span>
                                                <div>
                                                    {student.index_number}
                                                </div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b">
                                            <span>
                                                <div>{student.full_name}</div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                            <span>
                                                <div>{student.group_no}</div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                            <span>
                                                <div>
                                                    {
                                                        student.attendance_stats
                                                            .present_percentage
                                                    }
                                                </div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                            <span>
                                                <div>
                                                    {
                                                        student.attendance_stats
                                                            .absent_percentage
                                                    }
                                                </div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b text-right pr-6">
                                            <span>
                                                <div>
                                                    <button
                                                        className="inline-flex cursor-pointer text-gray-text hover:!text-primary transition duration-500"
                                                        title="Edit"
                                                        onClick={() => {
                                                            setModalOpen(true);
                                                            setModalType(
                                                                "editStudent",
                                                            );
                                                            setModalEdit(
                                                                student,
                                                            );
                                                        }}>
                                                        <PencilSquareIcon className="h-6 w-6 " />
                                                    </button>
                                                </div>
                                            </span>
                                        </td>
                                    </tr>
                                ))} */}
                        </tbody>
                    </table>
                </div>

                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.js">
                    <div style={{ height: "750px" }}>
                        <Viewer
                            fileUrl="/pdf-open-parameters.pdf"
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </div>
                </Worker>
            </div>
        </AppLayout>
    );
};

export default Student;

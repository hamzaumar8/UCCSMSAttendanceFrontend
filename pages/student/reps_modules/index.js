import useSWR from "swr";
import HeadTitle from "../../../components/HeadTitle";
import { SectionLoader } from "../../../components/PageLoader";
import SemesterTag from "../../../components/SemesterTag";
import axios from "../../../src/lib/axios";
import StudentLayout from "../../../components/Layouts/StudentLayout";
import StudentAllModules from "../../../components/Student/Modules/StudentAllModules";

const RepsModules = () => {
    const {
        data: courseRepModules,
        error,
        mutate,
    } = useSWR(`api/v1/course_rep/modules`, () =>
        axios
            .get(`api/v1/course_rep/modules`)
            .then(response => response.data.data),
    );

    return (
        <StudentLayout header="Registered Modules">
            {/* Title */}
            <HeadTitle title="Student Modules" />

            {/* Main Section */}
            <div className="space-y-8 sm:mt-10">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-500 ease-in-out">
                    {/* Header */}
                    <div className="p-5 pb-2 block sm:flex  items-center justify-between relative">
                        <div className="flex items-center justify-center space-x-8">
                            <h1 className="text-xl font-extrabold ">
                                Reps Modules
                            </h1>
                        </div>
                        <SemesterTag />
                        <div></div>
                    </div>

                    <div className="bg-white space-y-3 transition duration-500 ease-in-out">
                        <>
                            {courseRepModules === undefined ? (
                                <SectionLoader />
                            ) : (
                                <StudentAllModules modules={courseRepModules} />
                            )}
                        </>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
};

export default RepsModules;

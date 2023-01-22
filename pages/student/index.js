import HeadTitle from "../../components/HeadTitle";
import StudentLayout from "../../components/Layouts/StudentLayout";
import axios from "../../src/lib/axios";
import Card from "../../components/Card";
import { GuestSemesterNotFound } from "../../components/SemesterNotFound";
import Link from "next/link";
import useSWR from "swr";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import format from "date-fns/format";
import { SectionLoader } from "../../components/PageLoader";
import ModulesList from "../../components/Student/Dashboard/ModulesList";
import { useAuth } from "../../src/hooks/auth";

const StudentDashboard = ({ semester }) => {
    const { user } = useAuth({ middleware: "auth" });
    const {
        data: studentModules,
        error,
        mutate,
    } = useSWR("api/v1/student/modules/", () =>
        axios
            .get("api/v1/student/modules/")
            .then(response => response.data.data),
    );
    return (
        <StudentLayout header="Here's an overview of all attendaces">
            <HeadTitle title="Student Dashboard" />

            <div className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-8 space-y-5 sm:space-y-0">
                    <div className="col-span-1 xl:col-span-2">
                        <Card
                            titleClassName="!items-start"
                            header={
                                semester && (
                                    <h1 className="text-black-text  uppercase text-xl py-2 font-bold">
                                        {semester?.semester} semester
                                    </h1>
                                )
                            }
                            button={
                                semester && (
                                    <div className="bg-[#F3F3F3] py-2 rounded-lg">
                                        <div className="flex space-x-2 border-b px-3 pb-1">
                                            <CalendarDaysIcon className="h-5 w-5 text-gray-text" />
                                            <div className="font-bold uppercase">
                                                {format(
                                                    new Date(
                                                        semester?.start_date,
                                                    ),
                                                    "dd MMM",
                                                )}
                                                {" - "}
                                                {format(
                                                    new Date(
                                                        semester?.end_date,
                                                    ),
                                                    "dd MMM",
                                                )}
                                            </div>
                                        </div>
                                        <div className="px-3 pt-1 text-gray-text">
                                            <div>
                                                {semester?.academic_year}{" "}
                                                Academic Year
                                            </div>
                                        </div>
                                    </div>
                                )
                            }>
                            <div className="mr-16 space-y-4">
                                <h1 className="text-black-text text-lg font-bold">
                                    Summary
                                </h1>
                                <div className="space-y-4">
                                    <Link
                                        href={"/modules"}
                                        className="flex items-center justify-between bg-green-300 p-2 rounded-md">
                                        <div className="flex space-x-4 items-center">
                                            <div className="bg-blue-700 h-2 w-2 rounded-full"></div>
                                            <h3>Registered Modules</h3>
                                        </div>
                                        <div className="bg-white text-xs font-semibold block px-1 text-center rounded-lg w-[50px] py-0.5 mr-6">
                                            <span>
                                                {studentModules?.length}
                                            </span>
                                        </div>
                                    </Link>
                                    <Link
                                        href={"/students"}
                                        className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                                        <div className="flex space-x-4 items-center">
                                            <div className="bg-blue-700 h-2 w-2 rounded-full"></div>
                                            <h3>Attendance Percenage</h3>
                                        </div>
                                        <div className="bg-white text-xs font-semibold block px-1 text-center rounded-lg w-[50px] py-0.5 mr-6">
                                            <span>
                                                {
                                                    user?.student
                                                        ?.attendance_stats
                                                        .present_percentage
                                                }
                                                %
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </div>
                    {/* Active Modules Card */}
                    <div className="col-span-1 xl:col-span-3">
                        {semester ? (
                            <Card
                                header={
                                    <h1 className="text-black-text font-extrabold capitalize">
                                        Registered Mdoules
                                    </h1>
                                }
                                button={
                                    studentModules?.length > 8 && (
                                        <Link
                                            href={"/modules"}
                                            className="bg-primary-accent text-primary px-6 py-2 rounded-full text-xs font-bold">
                                            View All
                                        </Link>
                                    )
                                }>
                                <div className="space-y-3 overflow-x-auto pb-2 sm:pb-0">
                                    {studentModules === undefined ? (
                                        <SectionLoader />
                                    ) : (
                                        studentModules
                                            ?.slice(0, 8)
                                            .map(module => (
                                                <ModulesList
                                                    key={module.id}
                                                    module={module}
                                                />
                                            ))
                                    )}
                                </div>
                            </Card>
                        ) : (
                            <GuestSemesterNotFound />
                        )}
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
};

export default StudentDashboard;

export async function getServerSideProps() {
    const responseSemester = await axios.get("api/v1/semester");
    const semester = responseSemester.data;
    return {
        props: {
            semester,
        },
    };
}

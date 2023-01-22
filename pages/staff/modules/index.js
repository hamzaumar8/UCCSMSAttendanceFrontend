import HeadTitle from "../../../components/HeadTitle";
import LecturerLayout from "../../../components/Layouts/LecturerLayout";
import axios from "../../../src/lib/axios";
import useSWR from "swr";
import ElementNotFound from "../../../components/ElementNorFound";
import ModuleCardLecturer from "../../../components/Cards/ModuleCardLecturer";
import { SectionLoader } from "../../../components/PageLoader";

const StaffModules = () => {
    const {
        data: lecturerModules,
        error,
        mutate,
    } = useSWR(`/api/v1/lecturer/modules`, () =>
        axios
            .get(`/api/v1/lecturer/modules`)
            .then(response => response.data.data),
    );

    return (
        <LecturerLayout header="My Modules">
            <HeadTitle title="Lecturer Modules" />

            {/* Main Content  */}
            <div className="relative space-y-10">
                <div className="relative rounded-t-xl sm:rounded-b-xl bg-white sm:mt-10  sm:min-h-0">
                    <div className="flex justify-between items-center py-6 px-4 pt-1 sm:pt-4 sm:border-b">
                        <h2 className="text-black-text font-extrabold text-2xl">
                            My Active Modules
                        </h2>
                    </div>
                    <div className="relative px-4 pb-6 sm:pt-6">
                        {lecturerModules === undefined ? (
                            <SectionLoader />
                        ) : (
                            <>
                                {lecturerModules?.length > 0 ? (
                                    <div className="space-y-4 sm:space-y-0 sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {lecturerModules
                                            ?.filter(
                                                itm => itm.status === "active",
                                            )
                                            .map((module, index) => {
                                                return (
                                                    <ModuleCardLecturer
                                                        key={index}
                                                        module={module}
                                                    />
                                                );
                                            })}
                                    </div>
                                ) : (
                                    <ElementNotFound>
                                        <h2 className="text-xl sm:text-2xl text-primary font-bold">
                                            No Active Module Available
                                        </h2>
                                        <p className="text-gray-text font-[500]">
                                            Sorry! You don't have any module
                                            assigned yet.
                                        </p>
                                    </ElementNotFound>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="relative rounded-t-xl sm:rounded-b-xl bg-white  pb-20 sm:pb-5  sm:min-h-0">
                    <div className="flex justify-between items-center py-6 px-4 pt-1 sm:pt-4 sm:border-b">
                        <h2 className="text-black-text font-extrabold text-2xl">
                            My Upcomming and Inactive Modules
                        </h2>
                    </div>
                    <div className="relative px-4 pb-6 sm:pt-6">
                        {lecturerModules === undefined ? (
                            <SectionLoader />
                        ) : (
                            <>
                                {lecturerModules?.length > 0 ? (
                                    <div className="space-y-4 sm:space-y-0 sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {lecturerModules
                                            .filter(
                                                itm => itm.status !== "active",
                                            )
                                            ?.map((module, index) => {
                                                return (
                                                    <ModuleCardLecturer
                                                        key={index}
                                                        module={module}
                                                    />
                                                );
                                            })}
                                    </div>
                                ) : (
                                    <ElementNotFound>
                                        <h2 className="text-xl sm:text-2xl text-primary font-bold">
                                            No Upcomming and Inactive Module
                                            Available
                                        </h2>
                                        <p className="text-gray-text font-[500]">
                                            Sorry! You don't have any module
                                            assigned yet.
                                        </p>
                                    </ElementNotFound>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </LecturerLayout>
    );
};

export default StaffModules;

export async function getServerSideProps() {
    // const studentsResponse = await axios.get("api/v1/students");
    // const students = studentsResponse.data.data;
    return {
        props: {},
    };
}

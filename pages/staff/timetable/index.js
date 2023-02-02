import HeadTitle from "../../../components/HeadTitle";
import LecturerLayout from "../../../components/Layouts/LecturerLayout";
import PageLoader from "../../../components/PageLoader";
import StudentTimetable from "../../../components/Student/Dashboard/Timetable";
import { useSemester } from "../../../src/hooks/semester";

const StaffTimetable = () => {
    const { semester } = useSemester();
    if (semester === undefined) {
        return <PageLoader />;
    }
    return (
        <LecturerLayout header="Timetable">
            {/* Title */}
            <HeadTitle title="Timetable" />
            {/* Main Section */}
            <StudentTimetable semester={semester} />
        </LecturerLayout>
    );
};

export default StaffTimetable;

import HeadTitle from "../../../components/HeadTitle";
import LecturerLayout from "../../../components/Layouts/LecturerLayout";
import StudentTimetable from "../../../components/Student/Dashboard/Timetable";
import axios from "../../../src/lib/axios";

const StaffTimetable = ({ semester }) => {
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

export async function getServerSideProps() {
    const responseSemester = await axios.get("api/v1/semester");
    const semester = responseSemester.data.data;
    return {
        props: {
            semester,
        },
    };
}

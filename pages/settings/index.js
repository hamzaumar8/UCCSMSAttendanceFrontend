import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";
import Card from "../../components/Card";
import HeadTitle from "../../components/HeadTitle";
import { useState } from "react";
import SetSemester from "../../components/Settings/SetSemster";
import EditSetSemester from "../../components/Settings/EditSetSemester";
import { useSemester } from "../../src/hooks/semester";
import Profile from "../../components/Settings/Profile";
import Button from "../../components/Button";
import Link from "next/link";

const Settings = ({ promotion }) => {
    console.log(promotion);
    const { semester, promoteStudent, loading } = useSemester();
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const handlePromotion = event => {
        event.preventDefault();
        promoteStudent({
            id: promotion.semester.id,
            setErrors,
            setStatus,
        });
    };
    return (
        <AppLayout header="Settings">
            <HeadTitle title="Settings" />

            <div className="space-y-8">
                {/* Profile */}
                <Profile />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8">
                    <div className="col-span-2 md:col-span-1 ">
                        {semester ? (
                            <EditSetSemester currentSemester={semester} />
                        ) : (
                            <>
                                {promotion.semester.semester === "second" ? (
                                    <Card
                                        header={
                                            <h1 className="text-black-text font-extrabold capitalize">
                                                Student Promotion
                                            </h1>
                                        }>
                                        <div className="space-y-3">
                                            {promotion.check === "set" ? (
                                                <>
                                                    {promotion.semester
                                                        .promotion_status ===
                                                    "open" ? (
                                                        <div>
                                                            <div className="bg-secondary-accent p-2">
                                                                Promotion is
                                                                done
                                                            </div>
                                                            <SetSemester />
                                                        </div>
                                                    ) : (
                                                        <form
                                                            onSubmit={
                                                                handlePromotion
                                                            }>
                                                            <div className="text-lg font-bold">
                                                                Click the button
                                                                below to promote
                                                                students before
                                                                the start of a
                                                                new academic
                                                                year (First
                                                                semester).
                                                            </div>
                                                            <div className="flex justify-end">
                                                                <Button
                                                                    type="submit"
                                                                    loader={
                                                                        loading
                                                                    }>
                                                                    Promote
                                                                </Button>
                                                            </div>
                                                        </form>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="bg-red-200 p-2">
                                                    All Module Results and
                                                    Assessment are not
                                                    Published. Please click on
                                                    this link{" "}
                                                    <Link
                                                        href={"/results"}
                                                        className="underline text-primary font-bold">
                                                        Results
                                                    </Link>{" "}
                                                    and set all statuses to
                                                    published.
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ) : (
                                    <>
                                        {promotion.check === "set" ? (
                                            <SetSemester />
                                        ) : (
                                            <div className="bg-red-200 p-2">
                                                All Module Results and
                                                Assessment are not Published.
                                                Please click on this link{" "}
                                                <Link
                                                    href={"/results"}
                                                    className="underline text-primary font-bold">
                                                    Results
                                                </Link>{" "}
                                                and set all statuses to
                                                published.
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Settings;

export async function getServerSideProps() {
    const promotionResponse = await axios.get("api/v1/promotion/check");
    const promotion = promotionResponse.data.data;
    return {
        props: {
            promotion,
        },
    };
}

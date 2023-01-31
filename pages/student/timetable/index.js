import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import HeadTitle from "../../../components/HeadTitle";
import { useSemester } from "../../../src/hooks/semester";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { SectionLoader } from "../../../components/PageLoader";
import ElementNotFound from "../../../components/ElementNorFound";
import Image from "next/image";
import SemesterNotFound from "../../../components/SemesterNotFound";
import { useState } from "react";
import { useEffect } from "react";
import LecturerLayout from "../../../components/Layouts/LecturerLayout";

const Timetable = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const { semester } = useSemester();

    const [pdfBlob, setPDFBlob] = useState(null);

    useEffect(() => {
        if (semester?.timetable) {
            fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/timetable/display/${semester?.id}`,
            ).then(response => setPDFBlob(response.url));
        }
    }, [semester]);

    return (
        <LecturerLayout header="Timetable">
            {/* Title */}
            <HeadTitle title="Timetable" />
            {/* Main Section */}
            <div className="space-y-5 mt-10">
                <div className="flex items-center justify-between relative">
                    <div className="flex space-x-4 items-center">
                        <h1 className="text-black font-extrabold text-xl">
                            Semester Timetable
                        </h1>
                    </div>
                </div>
                <div className="relative rounded-xl sm:rounded-b-xl bg-white">
                    {semester === undefined ? (
                        <SectionLoader />
                    ) : semester ? (
                        <>
                            {semester?.timetable ? (
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.js">
                                    <div className="h-[800px]">
                                        <Viewer
                                            fileUrl={
                                                pdfBlob ? pdfBlob : "/file.pdf"
                                            }
                                            plugins={[
                                                defaultLayoutPluginInstance,
                                            ]}
                                        />
                                    </div>
                                </Worker>
                            ) : (
                                <ElementNotFound>
                                    <div className="relative flex flex-col justify-center items-center h-[180px] w-full">
                                        <div className="relative justify-center items-center h-[161px] w-[114px]">
                                            <Image
                                                src="/question.png"
                                                fill
                                                alt="NotFoundSVG"
                                            />
                                        </div>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl text-primary font-bold">
                                        No Timetable for the Semester.
                                    </h2>
                                    <p className="text-gray-text font-[500]">
                                        Sorry! You don't have the semester
                                        timetable set yet.
                                    </p>
                                </ElementNotFound>
                            )}
                        </>
                    ) : (
                        <SemesterNotFound />
                    )}
                </div>
            </div>
        </LecturerLayout>
    );
};

export default Timetable;

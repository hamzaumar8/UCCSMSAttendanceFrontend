import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "../../../src/lib/axios";
import Card from "../../Card";
import ElementNotFound from "../../ElementNorFound";
import { SectionLoader } from "../../PageLoader";

const StudentTimetable = ({ semester }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [pdfBlob, setPDFBlob] = useState(null);

    useEffect(() => {
        const fetchPdf = async id => {
            const res = await axios.get(`/api/v1/timetable/display/${id}`);
            res.status === 200 && setPDFBlob(res.url);
        };
        if (semester.timetable) {
            fetchPdf(semester.id);
        }
    }, []);

    return (
        <div className="space-y-5 mt-10">
            <Card
                header={
                    <h1 className="text-black font-extrabold text-xl">
                        Semester Timetable
                    </h1>
                }>
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
                                        plugins={[defaultLayoutPluginInstance]}
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
                                    Timetable not available yet.
                                </h2>
                                <p className="text-gray-text font-[500]">
                                    Sorry! the timetable for the semester is not
                                    set yet.
                                </p>
                            </ElementNotFound>
                        )}
                    </>
                ) : (
                    <SemesterNotFound />
                )}
            </Card>
        </div>
    );
};

export default StudentTimetable;

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { pdfBlobState } from "../../../src/atoms/semesterAtom";
import Card from "../../Card";
import ElementNotFound from "../../ElementNorFound";

const StudentTimetable = ({ semester }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [pdfBlob, setPDFBlob] = useRecoilState(pdfBlobState);

    useEffect(() => {
        const fetchPdf = async id => {
            fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/timetable/display/${id}`,
            ).then(
                response => response.status === 200 && setPDFBlob(response.url),
            );
        };
        if (semester?.timetable) {
            fetchPdf(semester?.id);
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
                {semester ? (
                    <>
                        {semester?.timetable ? (
                            <div className="h-[800px] w-full">
                                {pdfBlob && (
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.js">
                                        <Viewer
                                            fileUrl={pdfBlob}
                                            plugins={[
                                                defaultLayoutPluginInstance,
                                            ]}
                                        />
                                    </Worker>
                                )}
                                {!pdfBlob && <>file error or corrupted</>}
                            </div>
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

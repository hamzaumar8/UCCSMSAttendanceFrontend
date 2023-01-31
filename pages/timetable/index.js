import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import {
    ArrowUpTrayIcon,
    PencilIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useSemester } from "../../src/hooks/semester";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { SectionLoader } from "../../components/PageLoader";
import ElementNotFound from "../../components/ElementNorFound";
import Image from "next/image";
import SemesterNotFound from "../../components/SemesterNotFound";
import { useState } from "react";
import Button from "../../components/Button";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Link from "next/link";
import { useEffect } from "react";
import InputError from "../../components/InputError";

const Timetable = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const { semester, timetableSemester, loading } = useSemester();

    const [pdfBlob, setPDFBlob] = useState(null);

    useEffect(() => {
        if (semester?.timetable) {
            fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/timetable/display/${semester?.id}`,
            ).then(response => setPDFBlob(response.url));
        }
    }, [semester]);

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const [updateToggle, setUpdateToggle] = useState(false);

    // pdf file onChange state
    const [pdfFile, setPdfFile] = useState(null);
    const [timetableFile, setTimetableFile] = useState(null);

    // pdf file error state
    const [pdfError, setPdfError] = useState("");

    // handle file onChange event
    const allowedFiles = ["application/pdf"];
    const handleFile = e => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                setTimetableFile(selectedFile);
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = e => {
                    setPdfError("");
                    setPdfFile(e.target.result);
                };
            } else {
                setPdfError("Not a valid pdf: Please select only PDF");
                setPdfFile("");
            }
        } else {
            console.log("please select a PDF");
        }
    };

    const onSubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("timetable", timetableFile);
        timetableSemester({
            id: semester.id,
            formData,
            setErrors,
            setStatus,
        });
    };

    return (
        <AppLayout header="Timetable">
            {/* Title */}
            <HeadTitle title="Timetable" />
            {/* Main Section */}
            <div className="space-y-5">
                <div className="flex items-center justify-between relative">
                    <div className="flex space-x-4 items-center">
                        <h1 className="text-black font-extrabold text-xl">
                            Semester Timetable
                        </h1>
                    </div>
                    <div className="space-x-4 flex items-center">
                        {semester?.timetable ? (
                            !updateToggle ? (
                                <Button
                                    onClick={() => {
                                        setUpdateToggle(true);
                                        setPdfFile(pdfBlob);
                                    }}
                                    className="!capitalize !rounded-full !px-8">
                                    <PencilIcon className="w-4 h-4 mr-1" />
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setUpdateToggle(false);
                                    }}
                                    danger
                                    className="!capitalize !rounded-full !px-8">
                                    cancel
                                </Button>
                            )
                        ) : (
                            !updateToggle && (
                                <Button
                                    className="!capitalize !rounded-full !px-8"
                                    onClick={() => setUpdateToggle(true)}>
                                    <PlusIcon className="w-4 h-4 mr-1" />
                                    Add
                                </Button>
                            )
                        )}
                    </div>
                </div>
                <div className="relative rounded-xl sm:rounded-b-xl bg-white">
                    {updateToggle ? (
                        <div className="py-6 px-4 pt-1 sm:pt-4 space-y-5 block relative">
                            {/* Upload PDF */}
                            <form
                                onSubmit={onSubmit}
                                encType="multipart/form-data"
                                className="border-b relative pb-4 space-y-5">
                                <div className="">
                                    <Label htmlFor="pdfFile">Upload PDF</Label>
                                    <Input
                                        id="pdfFile"
                                        type="file"
                                        className="block mt-1 w-full"
                                        required
                                        onChange={handleFile}
                                    />

                                    {/* we will display error message in case user select some file other than pdf */}
                                    {pdfError && (
                                        <span className="text-danger">
                                            {pdfError}
                                        </span>
                                    )}
                                    <InputError
                                        messages={errors.timetable}
                                        className="mt-1"
                                    />
                                </div>
                                <div className="flex items-center justify-end ">
                                    <Button
                                        type="submit"
                                        className="!capitalize !rounded-full !px-8"
                                        loader={loading}>
                                        {pdfBlob ? "Update" : "Submit"}
                                    </Button>
                                </div>
                            </form>

                            {/* View PDF */}
                            <div className="space-y-5">
                                <h5 className="text-lg font-bold">
                                    Timetable PDF Preview
                                </h5>
                                <div className="bg-gray-200 flex justify-center items-center h-[800px] overflow-auto mb-3">
                                    {/* render this if we have a pdf file */}
                                    {pdfFile && (
                                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                                            <Viewer
                                                fileUrl={pdfFile}
                                                plugins={[
                                                    defaultLayoutPluginInstance,
                                                ]}></Viewer>
                                        </Worker>
                                    )}

                                    {/* render this if we have pdfFile state null   */}
                                    {!pdfFile && <>No file is selected yet</>}
                                </div>
                            </div>
                        </div>
                    ) : semester === undefined ? (
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
        </AppLayout>
    );
};

export default Timetable;

import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import { PlusIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSemester } from "../../src/hooks/semester";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useState } from "react";
import Button from "../../components/Button";
import Label from "../../components/Label";
import Input from "../../components/Input";
import { useEffect } from "react";
import InputError from "../../components/InputError";
import StudentTimetable from "../../components/Student/Dashboard/Timetable";
import axios from "../../src/lib/axios";
import { useRecoilState } from "recoil";
import { pdfBlobState } from "../../src/atoms/semesterAtom";

const Timetable = ({ semester }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const { timetableSemester, loading } = useSemester();

    const [pdfBlob, setPDFBlob] = useRecoilState(pdfBlobState);

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
            setPdfError("please select a PDF");
            setPdfFile("");
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
                                    <PencilSquareIcon className="w-4 h-4 mr-1" />
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
                    ) : (
                        <StudentTimetable semester={semester} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Timetable;

export async function getServerSideProps() {
    const responseSemester = await axios.get("api/v1/semester");
    const semester = responseSemester.data.data;
    return {
        props: {
            semester,
        },
    };
}

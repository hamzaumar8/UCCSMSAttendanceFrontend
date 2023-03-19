import { useState } from "react";
import { useResult } from "../../../src/hooks/result";
import Button from "../../Button";
import Input from "../../Input";
import InputError from "../../InputError";
import Label from "../../Label";

const ResultImport = ({ result, onClick }) => {
    const { importResult, loading } = useResult();

    const [file, setFile] = useState("");
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const handleFile = event => {
        if (event.target.files && event.target.files.length) {
            setFile(event.target.files[0]);
        }
    };

    const submitForm = event => {
        event.preventDefault();
        console.log(file);
        const formData = new FormData();
        formData.append("id", result.id);
        formData.append("file", file);
        importResult({
            id: result.id,
            formData,
            setErrors,
            setStatus,
        });
    };

    return (
        <form
            onSubmit={submitForm}
            className="-ml-2"
            acceptCharset="UTF-8"
            encType="multipart/form-data">
            <div className="flex items-center justify-between border-b px-8 py-4 ">
                <h4 className="text-2xl font-bold text-black-text capitalize">
                    Import Result
                </h4>
                <div className="space-x-4">
                    <Button
                        onClick={onClick}
                        className="!capitalize !rounded-full !px-8"
                        danger>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="!capitalize !rounded-full !px-8"
                        loader={loading}>
                        Submit
                    </Button>
                </div>
            </div>

            <div className="pb-10">
                <div className="py-4 px-8 pr-10 space-y-5">
                    <div className="flex items-center justify-between">
                        <p>Sample Excel file </p>
                        <a
                            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/export/results/${result.id}`}
                            type="button"
                            className="bg-primary-accent text-primary py-2 px-6 text-sm rounded-md">
                            Download
                        </a>
                    </div>
                </div>
                <div className="py-6 px-8 pr-10 space-y-5">
                    <div className="">
                        <Label htmlFor="file">Excel File</Label>
                        <Input
                            id="file"
                            type="file"
                            className="block mt-1 w-full"
                            onChange={handleFile}
                            required
                        />
                        <InputError messages={errors.file} className="mt-2" />
                    </div>
                    {loading && (
                        <div className="mt-2 text-center">
                            Uploading file data. Kindly wait ...
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ResultImport;

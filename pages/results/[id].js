import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Button from "../../components/Button";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import { ModalLoader } from "../../components/PageLoader";
import RemarksOverview from "../../components/Results/RemarksOverview";
import ResultLists from "../../components/Results/ResultLists";
import SemesterTag from "../../components/SemesterTag";
import { useResult } from "../../src/hooks/result";
import axios from "../../src/lib/axios";

const Result = ({ result }) => {
    const { editResult, loading } = useResult();
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const submitForm = event => {
        event.preventDefault();
        result.status = "submit";
        editResult({
            role: "admin",
            result,
            setErrors,
            setStatus,
        });
    };
    return (
        <AppLayout
            header={`${result.module.module.code} Results`}
            breadcrumbs={
                <div className="space-x-1 text-primary font-bold text-sm capitalize">
                    <Link href={"/dashboard"}>Dasbord /</Link>
                    <Link href={"/results"}>Results /</Link>
                    <span className="text-gray-text">
                        {result.module.module.code}
                    </span>
                </div>
            }>
            <HeadTitle title={`${result.module.module.code} Results`} />

            {/* Main content */}
            <div className="relative space-y-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-500 ease-in-out space-y-8">
                    {/* Header */}
                    <div className="px-5 block border-b sm:flex  items-center justify-between relative py-4 ">
                        <div className="flex items-center justify-center space-x-8">
                            <h1 className="text-2xl font-extrabold ">
                                {result.module.module.code}
                            </h1>
                            <SemesterTag />
                        </div>
                        {result.status === "save" && (
                            <div className="flex items-center space-x-2">
                                <Link
                                    href={`/results/edit/${result.id}`}
                                    className="bg-primary py-2 px-6 rounded-full capitalize text-xs font-bold text-white">
                                    Edit Results
                                </Link>
                                <button
                                    disabled={loading}
                                    onClick={submitForm}
                                    className="inline-flex items-center px-6 !py-2 bg-secondary rounded-full font-bold text-xs capitalize border border-transparent tracking-widest transition ease-in-out duration-150 space-x-2 text-white">
                                    Submit Results
                                </button>
                            </div>
                        )}
                        {result.status !== "save" && (
                            <div className="space-x-2 font-bold">
                                <span className="">Status:</span>
                                <span className="text-primary">
                                    {result.status === "submit" && "Submitted"}
                                    {result.status === "publish" && "Published"}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="space-y-8">
                        <RemarksOverview assessments={result.assessments} />
                        {/*  */}
                        <ResultLists assessments={result.assessments} />
                    </div>
                </div>
            </div>

            <AnimatePresence>{loading && <ModalLoader />}</AnimatePresence>
        </AppLayout>
    );
};

export default Result;

export async function getServerSideProps({ params }) {
    const response = await axios.get(`/api/v1/results/${params.id}`);
    return {
        props: {
            result: response.data.data,
        },
    };
}

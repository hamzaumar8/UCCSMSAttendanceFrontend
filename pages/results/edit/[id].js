import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../../../components/Button";
import HeadTitle from "../../../components/HeadTitle";
import InputError from "../../../components/InputError";
import AppLayout from "../../../components/Layouts/AppLayout";
import { ModalLoader } from "../../../components/PageLoader";
import SemesterTag from "../../../components/SemesterTag";
import {
    modalEditState,
    modalState,
    modalTypeState,
} from "../../../src/atoms/modalAtom";
import { useResult } from "../../../src/hooks/result";
import axios from "../../../src/lib/axios";

const EditResult = ({ result }) => {
    const { editResult, loading } = useResult();

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);
    const [scores, setScores] = useState(result.assessments);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        let temp = [...scores];
        temp[index].score = value;
        setScores(temp);
    };

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const saveForm = event => {
        event.preventDefault();
        result.status = "save";
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
                    <Link href={`/results/${result.id}`}>
                        {result.module.module.code} /
                    </Link>
                    <span className="text-gray-text">Edit</span>
                </div>
            }>
            <HeadTitle title={`${result.module.module.code} Results`} />

            {/* Main content */}
            <div className="relative space-y-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-500 ease-in-out">
                    <form onSubmit={saveForm}>
                        {/* Header */}
                        <div className="px-5 block sm:flex  items-center justify-between relative py-4 ">
                            <div className="flex items-center justify-center space-x-8">
                                <h1 className="text-2xl font-extrabold ">
                                    {result.module.module.code}
                                </h1>
                                <SemesterTag />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setModalOpen(true);
                                        setModalType("importResult");
                                        setModalEdit(result);
                                    }}
                                    className="inline-flex items-center px-6 py-2 bg-white text-primary rounded-full font-bold text-xs capitalize border border-primary tracking-widest transition ease-in-out duration-150">
                                    <ArrowUpTrayIcon className="w-4 h-4 mr-1" />
                                    Import CSV
                                </button>
                            </div>
                            <div className="space-x-2">
                                <Button
                                    type="submit"
                                    className="!rounded-full !capitalize px-6 !py-2">
                                    Save Results
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-t-2xl bg-white overflow-y-auto relative">
                            <table className="table  min-w-full">
                                <thead className="bg-primary-accent">
                                    <tr>
                                        <th className="text-left capitalize font-bold px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap pl-6">
                                            No.
                                        </th>
                                        <th className="text-left capitalize font-bold px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                                            Index Number
                                        </th>
                                        <th className="capitalize font-bold text-left px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                                            Name
                                        </th>
                                        <th className="capitalize font-bold px-2 pr-4 py-3  text-sm text-primary tracking-wider whitespace-nowrap">
                                            Score
                                        </th>
                                        <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                            Remark
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                                    {scores.map((assessment, index) => {
                                        const err = errors.includes(
                                            `assessments.${index}.score`,
                                        );
                                        return (
                                            <tr className="" key={index}>
                                                <td className="capitalize p-5 whitespace-nowrap border-b">
                                                    <span>
                                                        <div>{index + 1}.</div>
                                                    </span>
                                                </td>
                                                <td className="uppercase p-5 whitespace-nowrap border-b">
                                                    <span>
                                                        <div>
                                                            {
                                                                assessment
                                                                    .student
                                                                    .index_number
                                                            }
                                                        </div>
                                                    </span>
                                                </td>
                                                <td className="capitalize p-5 whitespace-nowrap border-b">
                                                    <span>
                                                        <div>
                                                            {
                                                                assessment
                                                                    .student
                                                                    .full_name
                                                            }
                                                        </div>
                                                    </span>
                                                </td>
                                                <td className="capitalize p-5 whitespace-nowrap text-center border-b">
                                                    <span>
                                                        <div>
                                                            <input
                                                                className={`${
                                                                    err
                                                                        ? "border-red-500 text-danger"
                                                                        : "border-gray-200 text-gray-text"
                                                                } border-2  text-center p-2  font-bold w-20 rounded-lg`}
                                                                name={`score.${index}`}
                                                                onChange={e =>
                                                                    handleChange(
                                                                        e,
                                                                        index,
                                                                    )
                                                                }
                                                                value={
                                                                    assessment.score
                                                                }
                                                            />
                                                            <InputError className="mt-2" />
                                                        </div>
                                                    </span>
                                                </td>
                                                <td className="capitalize py-5  border-b">
                                                    <div>
                                                        {assessment.remarks ===
                                                            "honour" && (
                                                            <span className="bg-secondary-accent text-green-600 font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                                                Honour
                                                            </span>
                                                        )}
                                                        {assessment.remarks ===
                                                            "pass" && (
                                                            <span className="bg-primary-accent text-primary font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                                                Pass
                                                            </span>
                                                        )}
                                                        {assessment.remarks ===
                                                            "fail" && (
                                                            <span className="bg-red-200 text-danger font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                                                Fail
                                                            </span>
                                                        )}
                                                        {assessment.remarks ===
                                                            "ic" && (
                                                            <span className="bg-white text-red-600 font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                                                Incomplete
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
            <AnimatePresence>{loading && <ModalLoader />}</AnimatePresence>
        </AppLayout>
    );
};

export default EditResult;

export async function getServerSideProps({ params }) {
    const response = await axios.get(`/api/v1/results/${params.id}`);
    return {
        props: {
            result: response.data.data,
        },
    };
}

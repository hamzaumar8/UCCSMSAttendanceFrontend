import React from "react";

const ResultLists = ({ assessments }) => {
    return (
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
                        <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                            Score
                        </th>
                        <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                            Remark
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                    {assessments.map((assessment, index) => (
                        <tr className="" key={index}>
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>{index + 1}.</div>
                                </span>
                            </td>
                            <td className="uppercase p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>{assessment.student.index_number}</div>
                                </span>
                            </td>
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>{assessment.student.full_name}</div>
                                </span>
                            </td>
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>{assessment.score}</div>
                                </span>
                            </td>
                            <td className="capitalize py-5  border-b">
                                <div>
                                    {assessment.remarks === "honour" && (
                                        <span className="bg-secondary-accent text-green-600 font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                            Honour
                                        </span>
                                    )}
                                    {assessment.remarks === "pass" && (
                                        <span className="bg-primary-accent text-primary font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                            Pass
                                        </span>
                                    )}
                                    {assessment.remarks === "fail" && (
                                        <span className="bg-red-200 text-danger font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                            Fail
                                        </span>
                                    )}
                                    {assessment.remarks === "ic" && (
                                        <span className="bg-red-300 text-white font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                            Incomplete
                                        </span>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultLists;

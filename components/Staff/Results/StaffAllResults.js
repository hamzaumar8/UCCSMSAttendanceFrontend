import { EyeIcon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ModalLoader } from "../../PageLoader";
const StaffAllResults = ({ results }) => {
    return (
        <div className="my-3 overflow-x-auto rounded-t-2xl bg-white overflow-y-auto relative">
            <table className="table  min-w-full">
                <thead className="bg-primary-accent">
                    <tr>
                        <th className="text-left capitalize font-bold px-2 pl-4 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                            No.
                        </th>
                        <th className="capitalize font-bold text-left px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                            Module
                        </th>
                        <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                            code
                        </th>
                        <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                            Cordinator
                        </th>
                        <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                            Status
                        </th>
                        <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                    {results?.length > 0 ? (
                        results?.map((result, index) => (
                            <tr className="" key={index}>
                                <td className="capitalize p-3 whitespace-nowrap border-b">
                                    <span>
                                        <div>{index + 1}</div>
                                    </span>
                                </td>
                                <td className="capitalize p-3 whitespace-nowrap border-b">
                                    <span>
                                        <div>{result.module.module.title}</div>
                                    </span>
                                </td>
                                <td className="capitalize p-3 whitespace-nowrap border-b">
                                    <span>
                                        <div>{result.module.module.code}</div>
                                    </span>
                                </td>
                                <td className="capitalize py-3  border-b">
                                    <div>
                                        {result.module.cordinator.full_name}
                                    </div>
                                </td>
                                <td className="capitalize py-3  border-b">
                                    <div>
                                        {result.status === "save" && (
                                            <span className="bg-white py-1 px-3 rounded-md font-bold text-black">
                                                Saved
                                            </span>
                                        )}
                                        {result.status === "submit" && (
                                            <span className="bg-white py-1 px-3 rounded-md font-bold text-primary">
                                                Submitted
                                            </span>
                                        )}
                                        {result.status === "publish" && (
                                            <span className="bg-white py-1 px-3 rounded-md font-bold text-green-600">
                                                Published
                                            </span>
                                        )}
                                    </div>
                                </td>

                                <td className="capitalize py-3 whitespace-nowrap border-b !text-right pr-5">
                                    <div className="space-x-3 inline-flex">
                                        <Link
                                            href={`/staff/results/${result.id}`}
                                            legacyBehavior>
                                            <a
                                                className="inline-flex cursor-pointer text-gray-text hover:!text-secondary transition duration-500"
                                                title="Details">
                                                <EyeIcon className="h-6 w-6 " />
                                            </a>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="">
                            <td
                                className="capitalize text-center p-3 whitespace-nowrap border-b"
                                colSpan={6}>
                                <span>
                                    <div className="text-lg font-bold text-danger">
                                        No Results Found.
                                    </div>
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StaffAllResults;

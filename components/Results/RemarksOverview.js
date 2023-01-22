const RemarksOverview = ({ assessments }) => {
    const honour = assessments.filter(item => item.remarks === "honour");
    const pass = assessments.filter(item => item.remarks === "pass");
    const fail = assessments.filter(item => item.remarks === "fail");
    const ic = assessments.filter(item => item.remarks === "ic");
    return (
        <div className="border relative w-full sm:w-1/2 border-b-0">
            <h1 className="text-lg font-bold px-5 py-2">Remarks Overview</h1>
            <div className="overflow-x-auto rounded-t-2xl bg-white overflow-y-auto relative">
                <table className="table  min-w-full">
                    <thead className="bg-primary-accent">
                        <tr>
                            <th className="capitalize font-bold px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap pl-6">
                                Remarks
                            </th>
                            <th className="capitalize font-bold px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-text text-sm !border-[#E6EAEF] text-center">
                        <tr className="">
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>Honour</div>
                                </span>
                            </td>
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>{honour.length}</div>
                                </span>
                            </td>
                        </tr>
                        <tr className="">
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>Pass</div>
                                </span>
                            </td>
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>{pass.length}</div>
                                </span>
                            </td>
                        </tr>
                        <tr className="">
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>Fail</div>
                                </span>
                            </td>
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>{fail.length}</div>
                                </span>
                            </td>
                        </tr>
                        <tr className="">
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>IC</div>
                                </span>
                            </td>
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>{ic.length}</div>
                                </span>
                            </td>
                        </tr>
                        <tr className="">
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>Total</div>
                                </span>
                            </td>
                            <td className="capitalize p-5 whitespace-nowrap border-b">
                                <span>
                                    <div>{assessments.length}</div>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RemarksOverview;

import StaffCordinatingModuleCard from "../CordinatingModules/StaffCordinatingModuleCard";

const StaffCordinatingModules = ({ cordinatingModules }) => {
    console.log(cordinatingModules);
    return (
        <div className="grid grid-cols-3 p-6 gap-8">
            {cordinatingModules.length > 0 ? (
                cordinatingModules.map((result, index) => (
                    <StaffCordinatingModuleCard key={index} result={result} />
                ))
            ) : (
                <div className="col-span-3">
                    <div className="text-center text-lg font-bold text-danger">
                        No Results for Cordintating Modules Found.
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffCordinatingModules;

import Link from "next/link";

const ModulesList = ({ module }) => {
    const active = module.status === "active";
    return (
        <div className="flex items-center justify-between p-1">
            <Link
                href={`/modules/${module.id}`}
                className="flex space-x-2 items-center">
                <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[80px] py-1 font-bold uppercase">
                    {module.module.code}
                </div>
                <h3 className="text-gray-text text-xs capitalize">
                    {module.module.title}
                </h3>
            </Link>
            <div className="flex items-center space-x-4">
                <div className="bg-gray-200 h-2 w-40 rounded-full relative overflow-hidden">
                    <div
                        className={`${
                            active ? "bg-blue-500" : "bg-secondary"
                        } block  h-full rounded-full`}
                        style={{
                            width: module.days.covered_percentage + "%",
                        }}></div>
                </div>
                <div className="text-xs text-gray-text">
                    <span>{module.days.covered_percentage}%</span>
                </div>
            </div>
        </div>
    );
};

export default ModulesList;

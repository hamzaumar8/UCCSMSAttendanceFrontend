import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import ActiveModules from "../../components/Modules/ActiveModules";
import UpInactiveModules from "../../components/Modules/UpInactiveModules";
import SemesterNotFound from "../../components/SemesterNotFound";
import ModuleBank from "../../components/Modules/ModuleBank";
import axios from "../../src/lib/axios";
const Modules = ({ semester, modules, modulesBank }) => {
    const modulesActive = modules.filter(itm => itm.status == "active");
    const modulesUpInactive = modules.filter(
        itm => itm.status == "upcoming" || itm.status == "inactive",
    );

    return (
        <AppLayout header="Modules">
            <HeadTitle title="Modules" />

            <div className="relative space-y-8">
                {semester ? (
                    <>
                        <ActiveModules modules={modulesActive} />
                        <UpInactiveModules modules={modulesUpInactive} />
                    </>
                ) : (
                    <SemesterNotFound />
                )}
                <ModuleBank modules={modulesBank} />
            </div>
        </AppLayout>
    );
};

export default Modules;

export async function getServerSideProps() {
    const response = await axios.get("api/v1/modules");
    const modules = response.data.data;

    const responseModuleBank = await axios.get("api/v1/module_banks");
    const modulesBank = responseModuleBank.data.data;

    const responseSemester = await axios.get("api/v1/semester");
    const semester = responseSemester.data;
    return {
        props: {
            semester,
            modules,
            modulesBank,
        },
    };
}

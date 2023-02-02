import { useAuth } from "../../src/hooks/auth";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../../src/atoms/modalAtom.js";
import { useRouter } from "next/router";
import LecturerBackNavigation from "./Lecturer/LecturerBackNavigation";
import PageLoader from "../PageLoader";
import StudentSideNav from "./Student/StudentSideNav";
import StudentNavigation from "./Student/StudentNavigation";
import Footer from "./Footer";

const StudentLayout = ({
    header = "",
    backNav = "",
    breadcrumbs = "",
    children,
}) => {
    const router = useRouter();
    const { user, isLoading } = useAuth({ middleware: "auth" });

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);

    if (user?.role === "ADM") router.push("/dashboard");
    if (user?.role === "STF") router.push("/staff");

    if (isLoading || !user) {
        return <PageLoader loading={isLoading} />;
    }
    return (
        <div className="bg-[#E5E5E5]">
            {/* Side Navigation */}
            <StudentSideNav user={user} />
            <main className="ease-in-out lg:ml-[18rem] relative min-h-screen rounded-xl transition-all duration-200">
                {backNav ? (
                    <LecturerBackNavigation
                        backNav={backNav}
                        breadcrumbs={breadcrumbs}
                    />
                ) : (
                    <StudentNavigation
                        user={user}
                        header={header}
                        breadcrumbs={breadcrumbs}
                    />
                )}
                {/* Page Content */}
                <section className="w-full p-6 sm:px-8 lg:px-12 sm:py-8 mx-auto">
                    {children}
                </section>
            </main>
            <Footer />
            <AnimatePresence>
                {modalOpen && (
                    <Modal
                        handleClose={() => setModalOpen(false)}
                        type={modalType}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentLayout;

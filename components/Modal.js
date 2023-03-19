import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { modalEditState } from "../src/atoms/modalAtom";
import Backdrop from "./Backdrop";
import LecturerAddForm from "./Modals/Lecturers/LecturerAddForm";
import ModuleEditForm from "./Modals/Module/ModuleEditForm";
import CheckInModal from "./Modals/Staff/CheckInModal";
import StudentAddForm from "./Modals/students/StudentAddForm";
import SlideUp from "./SlideUp";
import ModuleMountForm from "./Modals/Module/ModuleMountForm";
import ModuleAddForm from "./Modals/Module/ModuleAddForm";
import ModuleMountEditForm from "./Modals/Module/ModuleMountEditForm";
import LecturerEditForm from "./Modals/Lecturers/LecturerEditForm";
import StudentEditForm from "./Modals/students/StudentEditForm";
import AddGroup from "./Modals/Groups/AddGroup";
import LecturerImport from "./Modals/Lecturers/LecturerImport";
import StudentImport from "./Modals/students/StudentImport";
import ModuleStudentAddForm from "./Modals/Module/ModuleStudentAddForm";
import CheckInSuccess from "./Modals/Staff/CheckInSuccess";
import { ClipLoader } from "react-spinners";
import ResultImport from "./Modals/Results/ResultImport";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const gifYouUp = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.15,
            ease: "easeOut",
        },
    },
};

const Modal = ({ handleClose, type }) => {
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);
    return (
        <>
            {type === "addGroup" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <AddGroup onClick={handleClose} />
                        </div>
                    </motion.div>
                </Backdrop>
            )}
            {type === "addStudent" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <StudentAddForm onClick={handleClose} />
                        </div>
                    </motion.div>
                </Backdrop>
            )}

            {type === "importStudent" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <StudentImport onClick={handleClose} />
                        </div>
                    </motion.div>
                </Backdrop>
            )}
            {type === "editStudent" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <StudentEditForm
                                onClick={handleClose}
                                student={modalEdit}
                            />
                        </div>
                    </motion.div>
                </Backdrop>
            )}

            {type === "addModule" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <ModuleAddForm onClick={handleClose} />
                        </div>
                    </motion.div>
                </Backdrop>
            )}

            {type === "editModule" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <ModuleEditForm
                                onClick={handleClose}
                                module={modalEdit}
                            />
                        </div>
                    </motion.div>
                </Backdrop>
            )}

            {type === "addStudentModule" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <ModuleStudentAddForm
                                onClick={handleClose}
                                module={modalEdit}
                            />
                        </div>
                    </motion.div>
                </Backdrop>
            )}

            {type === "mountModule" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <ModuleMountForm onClick={handleClose} />
                        </div>
                    </motion.div>
                </Backdrop>
            )}

            {type === "editmountModule" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <ModuleMountEditForm
                                onClick={handleClose}
                                module={modalEdit}
                            />
                        </div>
                    </motion.div>
                </Backdrop>
            )}

            {type === "addlecturer" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <LecturerAddForm onClick={handleClose} />
                        </div>
                    </motion.div>
                </Backdrop>
            )}
            {type === "importLecturer" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <LecturerImport onClick={handleClose} />
                        </div>
                    </motion.div>
                </Backdrop>
            )}

            {type === "importResult" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <ResultImport
                                result={modalEdit}
                                onClick={handleClose}
                            />
                        </div>
                    </motion.div>
                </Backdrop>
            )}

            {type === "editLecturer" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        // variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <LecturerEditForm
                                onClick={handleClose}
                                lecturer={modalEdit}
                            />
                        </div>
                    </motion.div>
                </Backdrop>
            )}

            {type === "gifYouUp" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        className="rounded-lg md:rounded-r-none flex flex-col md:flex-row bg-[#1D2226] w-full max-w-6xl -mt-[7vh] mx-6 overflow-hidden"
                        variants={gifYouUp}
                        initial="hidden"
                        animate="visible"
                        exit="exit">
                        <motion.img
                            alt=""
                            onDoubleClick={handleClose}
                            src={"post.photoUrl"}
                            className="object-contain max-h-[80vh] w-full max-w-3xl"
                        />
                        {/*
                    <div className="w-full md:w-3/5 bg-white">
                        <Post post={post} modalPost />
                    </div> */}
                    </motion.div>
                </Backdrop>
            )}

            {type === "slideUp" && (
                <SlideUp onClick={handleClose} className="block sm:hidden">
                    <CheckInModal />
                </SlideUp>
            )}

            {type === "checkInMd" && (
                <Backdrop onClick={handleClose} className="hidden sm:flex">
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <CheckInModal onClick={handleClose} />
                        </div>
                    </motion.div>
                </Backdrop>
            )}
            {type === "checkInSuccess" && (
                <SlideUp>
                    <CheckInSuccess />
                </SlideUp>
            )}

            {type === "loader" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className=" max-w-xl mx-auto flex items-center min-h-full relative w-full pointer-events-none transition duration-300 ease-out">
                        <div className="flex relative flex-col w-full pointer-events-auto z-0 bg-primary-accent outline-none rounded-lg after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                            <ClipLoader
                                size={50}
                                color="#59FFA0"
                                loading={true}
                            />
                        </div>
                    </motion.div>
                </Backdrop>
            )}
        </>
    );
};

export default Modal;

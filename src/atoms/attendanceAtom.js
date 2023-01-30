import { atom } from "recoil";

export const confirmModalState = atom({
    key: "confirmModalState",
    default: false,
});

export const attendanceLecturerStudentState = atom({
    key: "attendanceLecturerStudentState",
    default: true,
});

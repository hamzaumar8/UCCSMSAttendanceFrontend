import useSWR from "swr";
import axios from "../lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useSemester = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const refreshData = () => {
        router.replace(router.asPath);
    };
    // CSRF
    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const {
        data: semester,
        error,
        mutate,
    } = useSWR("/api/v1/semester", () =>
        axios.get("/api/v1/semester").then(res => res.data.data),
    );

    const addSemester = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();

        axios
            .post("/api/v1/semester", props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    toast.success("Semester set successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status !== 422) {
                    console.log(error);
                } else {
                    setErrors(error.response.data.errors);
                }
            });
    };

    const editSemester = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .put(`/api/v1/semester/${props.id}`, props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    toast.success("Semester update successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status !== 422) {
                    console.log(error);
                } else {
                    setErrors(error.response.data.errors);
                }
            });
    };
    const promoteStudent = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .put(`/api/v1/student/level/promotion/${props.id}`, props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    toast.success("Promotion done successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status !== 422) {
                    console.log(error);
                } else {
                    setErrors(error.response.data.errors);
                }
            });
    };

    const timetableSemester = async ({
        setErrors,
        setStatus,
        formData,
        id,
    }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .post(`/api/v1/timetable/semester/${id}`, formData)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    toast.success("Semester timetable update successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status !== 422) {
                    console.log(error);
                } else {
                    setErrors(error.response.data.errors);
                }
            });
    };

    return {
        loading,
        semester,
        addSemester,
        editSemester,
        promoteStudent,
        timetableSemester,
    };
};

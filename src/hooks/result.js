import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../lib/axios";

export const useResult = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const editResult = async ({ setErrors, setStatus, role, result }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);
        await csrf();
        const status = result.status;

        axios
            .put(`/api/v1/results/${result.id}`, result)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    if (status === "submit") {
                        if (role === "staff") {
                            router.push("/staff/results/");
                        } else {
                            router.push("/results/");
                        }
                    } else {
                        if (role === "staff") {
                            router.push("/staff/results/" + result.id);
                        } else {
                            router.push("/results/" + result.id);
                        }
                    }
                    toast.success("Result updated!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status !== 422) {
                    console.log(error);
                } else {
                    setErrors(Object.keys(error.response.data.errors).flat());
                }
            });
    };

    const updateResultStatus = async ({ id }) => {
        setLoading(true);
        await csrf();

        axios
            .get(`/api/v1/update_status/result/${id}`)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    toast.success("Result status updated!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            });
    };

    const importResult = async ({
        setErrors,
        setStatus,
        formData,
        ...props
    }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .post(`/api/v1/import/results/${props.id}`, formData)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    setModalOpen(false);
                    toast.success("Lecturer was edited successfully!", {
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
        editResult,
        updateResultStatus,
        importResult,
    };
};

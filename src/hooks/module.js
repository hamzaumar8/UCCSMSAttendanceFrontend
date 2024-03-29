import useSWR from "swr";
import axios from "../lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { toast } from "react-toastify";

export const useModule = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useRecoilState(modalState);

    const [loading, setLoading] = useState(false);

    const refreshData = () => {
        router.replace(router.asPath);
    };

    // CSRF
    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const {
        data: SWRmodules,
        error,
        mutate,
    } = useSWR("/api/v1/module_banks", () =>
        axios.get("/api/v1/module_banks").then(response => response.data.data),
    );

    // Add Module to Module Bank
    const addModule = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .post("/api/v1/module_banks", props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    setModalOpen(false);
                    toast.success("Module has been added successfully!", {
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

    // Edit Module Bank
    const editModule = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .put(`/api/v1/module_banks/${props.id}`, props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    setModalOpen(false);
                    toast.success("Module edited successfully!", {
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

    const deleteModule = async ({ id }) => {
        setLoading(true);

        await csrf();
        axios
            .delete(`/api/v1/module_banks/${id}`)
            .then(res => {
                setLoading(false);
                refreshData();
                toast.success("Module deleted successfully!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 500) {
                    toast.error(error.response.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    console.log(error);
                }
            });
    };

    const endModule = async ({ id }) => {
        setLoading(true);

        await csrf();
        axios
            .get(`/api/v1/end/module/${id}`)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    toast.success("Module ended successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 500) {
                    toast.error(error.response.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    console.log(error);
                }
            });
    };

    // Add Mounted Moudle
    const mountModule = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .post("/api/v1/modules", props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    setModalOpen(false);
                    toast.success("Module Mounted Successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                } else if (error.response.status === 403) {
                    if (error.response.data.message === "set-semester") {
                        setModalOpen(false);
                        toast.error("Set Semester", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                } else {
                    console.log(error);
                }
            });
    };

    // Edit Mounted Moudle
    const editMountModule = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .put(`/api/v1/modules/${props.id}`, props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    setModalOpen(false);
                    toast.success("Mounted module edited successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                } else if (error.response.status === 403) {
                    if (error.response.data.message === "set-semester") {
                        setModalOpen(false);
                        toast.error("Set Semester", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    } else {
                        console.log(error);
                    }
                } else {
                    console.log(error);
                }
            });
    };

    const deleteMountModule = async ({ id }) => {
        setLoading(true);

        await csrf();
        axios
            .delete(`/api/v1/modules/${id}`)
            .then(res => {
                setLoading(false);
                refreshData();
                toast.success("Module deleted successfully!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 500) {
                    toast.error(error.response.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    console.log(error);
                }
            });
    };

    const addStudentModule = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .post(`/api/v1/add/student/${props.id}`, props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    setModalOpen(false);
                    toast.success("Module Mounted Successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                } else {
                    console.log(error);
                }
            });
    };

    return {
        loading,
        addModule,
        editModule,
        mountModule,
        editMountModule,
        deleteModule,
        endModule,
        deleteMountModule,
        addStudentModule,
    };
};

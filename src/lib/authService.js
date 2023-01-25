import Cookies from "js-cookie";

export const saveAuthToken = token => {
    Cookies.set("token", token, { expires: 1 / 48 });
};

export const removeAuthToken = () => {
    Cookies.remove("token");
};

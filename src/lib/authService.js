import Cookies from "js-cookie";

export const saveAuthToken = token => {
    // Cookies.set("token", token);
    Cookies.set("token", token, { expires: 1 / 12 });
};

export const removeAuthToken = () => {
    Cookies.remove("token");
};

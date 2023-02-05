import Cookies from "js-cookie";

export const saveAuthToken = token => {
    console.log(token);
    // Cookies.set("token", token {sameSite: "lax"} , );
    Cookies.set("token", token, { expires: 1 / 12 });
};

export const removeAuthToken = () => {
    Cookies.remove("token");
};

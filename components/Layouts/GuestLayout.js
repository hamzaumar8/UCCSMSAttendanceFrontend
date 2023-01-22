import Head from "next/head";
import HeadTitle from "../HeadTitle";

const GuestLayout = ({ children }) => {
    return (
        <div>
            <HeadTitle title="Auth" />

            <div className="font-sans text-black-text antialiased">
                {children}
            </div>
        </div>
    );
};

export default GuestLayout;

import Head from "next/head";
import HeadTitle from "../HeadTitle";

const GuestLayout = ({ children, heading = "" }) => {
    return (
        <div>
            <HeadTitle title={heading} />

            <div className="font-sans text-black-text antialiased">
                {children}
            </div>
        </div>
    );
};

export default GuestLayout;

// slider with framer motion react js

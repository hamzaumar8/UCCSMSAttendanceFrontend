import Link from "next/link";

const Footer = () => {
    return (
        <footer className="relative py-2 w-full">
            <p className="text-center text-primary font-normal">
                &copy;
                {new Date().getFullYear()} All rights reserved. By{" "}
                <Link
                    href="http://www.imaginosdigital.com/"
                    target={"_blank"}
                    className="underline">
                    Imaginos Digital
                </Link>
            </p>
        </footer>
    );
};

export default Footer;

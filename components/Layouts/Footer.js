import Link from "next/link";

const Footer = () => {
    return (
        <Footer className="relative py-2 w-full">
            <p className="text-center text-primary font-bold">
                &copy;
                {new Date().getFullYear()} All rights reserved. By
                <Link href="http://www.imaginosdigital.com/">
                    Imaginos Digital
                </Link>
            </p>
        </Footer>
    );
};

export default Footer;

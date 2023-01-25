import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import GuestLayout from "../components/Layouts/GuestLayout";

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];
const Home = ({ heading }) => {
    const [imgIndex, setImgIndex] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setImgIndex(prevIndex =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1,
                ),
            5000,
        );

        return () => {
            resetTimeout();
        };
    }, [imgIndex]);

    return (
        <GuestLayout heading={heading}>
            <div className="relative min-h-screen bg-gray-100 p-3 lg:p-0 space-y-10 lg:space-y-0 lg:flex">
                <div className="relative w-full lg:w-1/2 min-h-[70vh] rounded-lg lg:rounded-none overflow-hidden before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-black before:opacity-20 before:z-10">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={imgIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}>
                            <Image
                                src={images[imgIndex]}
                                fill
                                priority
                                alt={imgIndex}
                                className="relative object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="space-y-10 w-full lg:w-1/2 lg:flex lg:flex-col lg:items-center lg:justify-center lg:min-h-screen lg:p-6">
                    <div className="text-center">
                        <h1 className="text-black-text font-bold leading-10 text-4xl">
                            Welcome Back!
                        </h1>
                        <p className="text-gray-text text-sm">
                            To keep track of attendance, sign in to your account
                        </p>

                        <div className="space-x-1">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`w-8 h-1 rounded-full ${
                                        imgIndex === index
                                            ? "bg-primary"
                                            : "bg-blue-300"
                                    }`}
                                    onClick={() => setImgIndex(index)}></button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full">
                        <Link
                            href={"/login"}
                            className="w-full inline-flex items-center justify-center px-4 py-3  border border-transparent rounded-sm font-bold text-xs uppercase tracking-widest focus:ring disabled:opacity-25 transition ease-in-out duration-150 text-white bg-primary hover:bg-primary active:bg-primary focus:outline-none focus:border-primary ring-primary">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Home;

export async function getStaticProps() {
    return {
        props: {
            heading: "Welcome",
        },
    };
}

import Dropdown from "../Dropdown";
import ResponsiveNavLink, { ResponsiveNavButton } from "../ResponsiveNavLink";
import { DropdownButton } from "../DropdownLink";
import { useAuth } from "../../src/hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

const Navigation = ({ user, header, breadcrumbs }) => {
    const router = useRouter();

    const { logout } = useAuth();

    const [open, setOpen] = useState(false);

    return (
        <nav>
            <div className="bg-white">
                {/* Primary Navigation Menu */}
                <div className="px-6 sm:px-8 lg:px-12">
                    <div className="flex justify-between h-20">
                        {/* Page Heading */}
                        <div className="flex">
                            <div className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out">
                                <h2 className="font-bold text-2xl text-black-text leading-tight">
                                    {header}
                                </h2>
                            </div>
                        </div>

                        {/* Settings Dropdown */}
                        <div className="hidden lg:flex lg:items-center lg:ml-6">
                            <Dropdown
                                align="right"
                                width="48"
                                trigger={
                                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out space-x-2">
                                        <div className="h-10 w-10 rounded-full inline-block border-2 border-primary overflow-hidden">
                                            <Image
                                                src={user?.lecturer?.picture}
                                                width={100}
                                                height={100}
                                                alt={user?.name}
                                                className="h-full w-full"
                                            />
                                        </div>
                                        <div className="">
                                            <div className="capitalize">
                                                <span className="text-black font-bold">
                                                    {user?.name}
                                                </span>
                                                <div className="text-[0.6rem] text-primary font-bold bg-primary-accent px-4 py-0.5 rounded-full">
                                                    vice dean
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ml-1">
                                            <svg
                                                className="fill-current h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                }>
                                {/* Authentication */}
                                <DropdownButton onClick={logout}>
                                    Logout
                                </DropdownButton>
                            </Dropdown>
                        </div>

                        {/* Hamburger */}
                        <div className="-mr-2 flex items-center lg:hidden">
                            <button
                                onClick={() => setOpen(open => !open)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    {open ? (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Navigation Menu */}
                {open && (
                    <div className="block lg:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href="/dashboard"
                                active={router.pathname === "/dashboard"}>
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href="/modules"
                                active={router.pathname === "/modules"}>
                                Modules
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href="/students"
                                active={router.pathname === "/students"}>
                                Students
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href="/lecturers"
                                active={router.pathname === "/lecturers"}>
                                Lecturers
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href="/cordinators"
                                active={router.pathname === "/cordinators"}>
                                Coordinators
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href="/results"
                                active={router.pathname === "/results"}>
                                Results
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href="/groups"
                                active={router.pathname === "/groups"}>
                                Groups
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href="/settings"
                                active={router.pathname === "/settings"}>
                                Settings
                            </ResponsiveNavLink>
                        </div>

                        {/* Responsive Settings Options */}
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-10 w-10 fill-current text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>

                                <div className="ml-3">
                                    <div className="font-medium text-base text-black-text">
                                        {user?.name}
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                {/* Authentication */}
                                <ResponsiveNavButton onClick={logout}>
                                    Logout
                                </ResponsiveNavButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {breadcrumbs && (
                <div className="bg-primary-accent px-6 py-4 sm:px-8 lg:px-12">
                    {breadcrumbs}
                </div>
            )}
        </nav>
    );
};

export default Navigation;

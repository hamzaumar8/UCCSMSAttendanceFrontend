import {
    AcademicCapIcon,
    ArrowLeftOnRectangleIcon,
    ChartBarIcon,
    CloudArrowDownIcon,
    Cog6ToothIcon,
    PencilSquareIcon,
    RectangleGroupIcon,
    TableCellsIcon,
    UserGroupIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../src/hooks/auth";
import ApplicationLogo from "../ApplicationLogo";
import NavLink from "../NavLink";

const SideNav = () => {
    const router = useRouter();
    const { logout } = useAuth();
    return (
        <aside className="bg-primary max-w-[18rem] fixed block inset-y-0 -translate-x-full w-full flex-wrap items-center justify-between overflow-y-auto p-0 anatialised z-[9] transition-transform duration-200 lg:left-0 lg:translate-x-0">
            {/* Logo */}
            <div className="px-8 py-10 border-b border-b-[#94b4c0]">
                <Link href="/dashboard">
                    <div className="flex flex-shrink-0 items-center space-x-2">
                        <ApplicationLogo className="block max-h-14 w-auto " />
                        <div className="transition-all duration-200 ease-nav-brand text-white uppercase">
                            <h1 className="text-lg font-bold">UCC SMS</h1>
                            <span className="text-sm">Academic Tracker</span>
                        </div>
                    </div>
                </Link>
            </div>
            {/* Navigation Links */}
            <div className="items-center block w-auto max-h-screen overflow-auto grow basis-full">
                <div className="py-14 px-8 space-y-6 relative">
                    <NavLink
                        href="/dashboard"
                        active={router.pathname === "/dashboard"}>
                        <ChartBarIcon className="w-6 h-6" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        href="/modules"
                        active={router.pathname === "/modules"}>
                        <PencilSquareIcon className="w-6 h-6" />
                        <span>Modules</span>
                    </NavLink>
                    <NavLink
                        href="/students"
                        active={router.pathname === "/students"}>
                        <AcademicCapIcon className="w-6 h-6" />
                        <span>Students</span>
                    </NavLink>
                    <NavLink
                        href="/lecturers"
                        active={router.pathname === "/lecturers"}>
                        <UsersIcon className="w-6 h-6" />
                        <span>Lecturers</span>
                    </NavLink>
                    <NavLink
                        href="/cordinators"
                        active={router.pathname === "/cordinators"}>
                        <UserGroupIcon className="w-6 h-6" />
                        <span>Coordinators</span>
                    </NavLink>
                    <NavLink
                        href="/results"
                        active={router.pathname === "/results"}>
                        <CloudArrowDownIcon className="w-6 h-6" />
                        <span>Results</span>
                    </NavLink>
                    <NavLink
                        href="/groups"
                        active={router.pathname === "/groups"}>
                        <RectangleGroupIcon className="w-6 h-6" />
                        <span>Groups</span>
                    </NavLink>
                    <NavLink
                        href="/timetable"
                        active={router.pathname === "/timetable"}>
                        <TableCellsIcon className="w-6 h-6" />
                        <span>Timetable</span>
                    </NavLink>
                    <NavLink
                        href="/settings"
                        active={router.pathname === "/settings"}>
                        <Cog6ToothIcon className="w-6 h-6" />
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>

            <div className="items-center block w-auto max-h-screen overflow-auto grow basis-full">
                <div className="py-14 px-8 space-y-6 relative">
                    <button
                        className="inline-flex items-center justify-center space-x-2 w-full bg-secondary p-2 py-3 font-bold uppercase rounded-sm text-sm"
                        onClick={logout}>
                        <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};
export default SideNav;

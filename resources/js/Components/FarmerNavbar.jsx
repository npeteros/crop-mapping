import { Link } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";
import { useState } from "react";
import NavLink from "./NavLink";
import ResponsiveNavLink from "./ResponsiveNavLink";
import { DropdownNav, ResponsiveDropdownNav } from "./DropdownNav";

export default function FarmerNavbar({ user }) {
    const [open, setOpen] = useState(false);
    const [resourcesDropdown, setResourcesDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);

    const resourcesDropdownItems = {
        title: "Resource",
        links: [
            {
                name: "View Resources",
                url: "resources.index",
            },
            {
                name: "Farmer Registrations",
                url: "my-requests",
            },
        ],
    };

    return (
        <nav className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl mx-auto flex flex-col ">
                <div className="flex flex-wrap items-center justify-between w-full p-4">
                    <ApplicationLogo className="h-10" />
                    {user && (
                        <div className="hidden sm:flex space-x-3 rtl:space-x-reverse">
                            <NavLink
                                href={route("home")}
                                active={route().current("home")}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                href={route("maps")}
                                active={route().current("maps")}
                            >
                                View Map
                            </NavLink>
                            <div className="relative">
                                <button
                                    id="dropdownNavbarLink"
                                    data-dropdown-toggle="dropdownNavbar"
                                    className="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300"
                                    onClick={() =>
                                        setResourcesDropdown(!resourcesDropdown)
                                    }
                                >
                                    Resources{" "}
                                    <svg
                                        className="size-2 ms-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                <div
                                    id="dropdownNavbar"
                                    className={`z-10 ${
                                        resourcesDropdown
                                            ? "absolute"
                                            : "hidden"
                                    } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                                >
                                    <ul
                                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                        aria-labelledby="dropdownLargeButton"
                                    >
                                        <li>
                                            <Link
                                                href={route("resources.index")}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                View Resources
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route("my-requests")}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Request Status
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <NavLink
                                href={route("crops.index")}
                                active={route().current("crops.index")}
                            >
                                Crops
                            </NavLink>
                            <NavLink
                                href={route("insurance.create")}
                                active={route().current("insurance.create")}
                            >
                                Apply for Insurance
                            </NavLink>
                        </div>
                    )}
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {user ? (
                            <div className="relative">
                                <img
                                    id="avatarButton"
                                    type="button"
                                    className="w-10 h-10 rounded-full cursor-pointer relative"
                                    src="/img/profiles/default.png"
                                    alt="User dropdown"
                                    onClick={() =>
                                        setProfileDropdown(!profileDropdown)
                                    }
                                />

                                <div
                                    id="userDropdown"
                                    className={`z-50 ${
                                        profileDropdown
                                            ? "absolute top-12 right-0"
                                            : "hidden"
                                    } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                                >
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                        <div>
                                            {user.last_name}, {user.first_name}{" "}
                                            {user.middle_name ?? undefined}
                                        </div>
                                        <div className="font-medium truncate">
                                            {user.email}
                                        </div>
                                    </div>
                                    <ul
                                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                        aria-labelledby="avatarButton"
                                    >
                                        <li>
                                            <Link
                                                method="post"
                                                href={route("logout")}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Sign out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <Link href={route("login")}>
                                <button
                                    type="button"
                                    className="text-white bg-primary-light hover:bg-primary-dark focus:ring-2 focus:outline-none focus:ring-primary-dark font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary-dark dark:hover:bg-primary-dark dark:focus:ring-primary-dark"
                                >
                                    Get started
                                </button>
                            </Link>
                        )}
                        {user && (
                            <button
                                data-collapse-toggle="navbar-sticky"
                                type="button"
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-sticky"
                                aria-expanded="false"
                                onClick={() => setOpen(!open)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 17 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 1h15M1 7h15M1 13h15"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
                <div>
                    {user && (
                        <div
                            className={
                                (open ? "block" : "hidden") + " sm:hidden"
                            }
                        >
                            <div className="space-y-1 pb-3 pt-2">
                                <ResponsiveNavLink
                                    href={route("home")}
                                    active={route().current("home")}
                                >
                                    Home
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("maps")}
                                    active={route().current("maps")}
                                >
                                    View Map
                                </ResponsiveNavLink>
                                <ResponsiveDropdownNav
                                    routes={resourcesDropdownItems}
                                />
                                <ResponsiveNavLink
                                    href={route("crops.index")}
                                    active={route().current("crops.index")}
                                >
                                    Crops
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("insurance.create")}
                                    active={route().current("insurance.create")}
                                >
                                    Apply for Insurance
                                </ResponsiveNavLink>
                            </div>

                            <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                                <div className="px-4">
                                    <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {user.email}
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route("logout")}
                                        as="button"
                                    >
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

import { Link } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";
import { useState } from "react";
import NavLink from "./NavLink";

export default function FarmerNavbar({ user }) {
    const [open, setOpen] = useState(false);
    const [resourcesDropdown, setResourcesDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    return (
        <nav className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <ApplicationLogo className="h-10" />
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
                                className={`z-10 ${
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
                {user && (
                    <div
                        className={`items-center justify-between ${
                            !open && "hidden"
                        } w-full md:flex md:w-auto md:order-1`}
                        id="navbar-sticky"
                    >
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link
                                    href={route("home")}
                                    className={
                                        route().current("home")
                                            ? "block py-2 px-3 text-white bg-primary-dark rounded md:bg-transparent md:text-secondary-dark md:p-0 md:dark:text-secondary-light"
                                            : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-dark md:p-0 md:dark:hover:text-secondary-light dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    }
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("maps")}
                                    className={
                                        route().current("maps")
                                            ? "block py-2 px-3 text-white bg-secondary-dark rounded md:bg-transparent md:text-secondary-dark md:p-0 md:dark:text-secondary-light"
                                            : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-dark md:p-0 md:dark:hover:text-secondary-light dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    }
                                >
                                    View Map
                                </Link>
                            </li>
                            <li>
                                <button
                                    id="dropdownNavbarLink"
                                    data-dropdown-toggle="dropdownNavbar"
                                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                    onClick={() =>
                                        setResourcesDropdown(!resourcesDropdown)
                                    }
                                >
                                    Resources{" "}
                                    <svg
                                        className="w-2.5 h-2.5 ms-2.5"
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
                                        resourcesDropdown ? "fixed" : "hidden"
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
                                                href="#"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Request Status
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <Link
                                    href={route("insurance.create")}
                                    className={
                                        route().current("insurance.create")
                                            ? "block py-2 px-3 text-white bg-secondary-dark rounded md:bg-transparent md:text-secondary-dark md:p-0 md:dark:text-secondary-light"
                                            : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-dark md:p-0 md:dark:hover:text-secondary-light dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    }
                                >
                                    Apply for Insurance
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

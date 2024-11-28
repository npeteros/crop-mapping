import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [showingResourcesDropdown, setShowingResourcesDropdown] =
        useState(false);

    const [showingAccountsDropdown, setShowingAccountsDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 sm:flex">
            <nav className="border-b sm:border-r border-gray-400 bg-white dark:border-gray-700 dark:bg-gray-800 sm:flex sm:flex-col">
                <div className="mx-auto max-w-7xl px-4 sm:p-6 lg:p-8">
                    <div className="flex h-16 sm:h-full justify-between">
                        <div className="flex sm:flex-col sm:space-y-8">
                            <div className="flex shrink-0 items-center sm:justify-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <div className="hidden sm:space-y-8 sm:flex sm:flex-col sm:justify-between">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route("maps")}
                                    active={route().current("maps")}
                                >
                                    Maps
                                </NavLink>
                                <NavLink>Crops</NavLink>
                                <NavLink
                                    href={route("insurance.index")}
                                    active={route().current("insurance.index")}
                                >
                                    Insurance
                                </NavLink>
                                <div className="flex flex-col gap-2">
                                    <button
                                        className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 gap-8"
                                        onClick={() =>
                                            setShowingResourcesDropdown(
                                                !showingResourcesDropdown
                                            )
                                        }
                                    >
                                        Resources
                                        <svg
                                            className="size-2"
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
                                    {showingResourcesDropdown && (
                                        <ul
                                            id="dropdown-example"
                                            className="space-y-2 flex flex-col gap-1"
                                        >
                                            <NavLink
                                                href={route("resources.index")}
                                                active={route().current(
                                                    "resources.index"
                                                )}
                                            >
                                                <span className="inline-flex items-center ml-6 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 justify-between w-full">
                                                    Manage Resources
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                href={route("requests")}
                                                active={route().current(
                                                    "requests"
                                                )}
                                            >
                                                <span className="inline-flex items-center ml-6 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 justify-between w-full">
                                                    Manage Requests
                                                </span>
                                            </NavLink>
                                        </ul>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 gap-8"
                                        onClick={() =>
                                            setShowingAccountsDropdown(
                                                !showingAccountsDropdown
                                            )
                                        }
                                    >
                                        Accounts
                                        <svg
                                            className="size-2"
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
                                    {showingAccountsDropdown && (
                                        <ul
                                            id="dropdown-example"
                                            className="space-y-2 flex flex-col gap-1"
                                        >
                                            <NavLink
                                                href={route("manage-accounts")}
                                                active={route().current(
                                                    "manage-accounts"
                                                )}
                                            >
                                                <span className="inline-flex items-center ml-6 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 justify-between w-full">
                                                    Manage Accounts
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                href={route("farmer-registrations")}
                                                active={route().current(
                                                    "farmer-registrations"
                                                )}
                                            >
                                                <span className="inline-flex items-center ml-6 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 justify-between w-full">
                                                    Farmer Registrations
                                                </span>
                                            </NavLink>
                                        </ul>
                                    )}
                                </div>
                                <NavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </NavLink>
                                {/* <button>
                                    Dark Mode
                                </button> */}
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("maps")}
                            active={route().current("maps")}
                        >
                            Maps
                        </ResponsiveNavLink>
                        <ResponsiveNavLink>Crops</ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("insurance.index")}
                            active={route().current("insurance.index")}
                        >
                            Insurance
                        </ResponsiveNavLink>
                        <div className="flex flex-col gap-2">
                            <button
                                className="flex w-full justify-between items-center border-l-4 py-2 pe-4 ps-3 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:focus:border-gray-600 dark:focus:bg-gray-700 dark:focus:text-gray-200 text-base font-medium transition duration-150 ease-in-out focus:outline-none"
                                onClick={() =>
                                    setShowingResourcesDropdown(
                                        !showingResourcesDropdown
                                    )
                                }
                            >
                                Resources
                                <svg
                                    className="size-2"
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
                            {showingResourcesDropdown && (
                                <ul
                                    id="dropdown-example"
                                    className="space-y-2 flex flex-col gap-1"
                                >
                                    <ResponsiveNavLink
                                        href={route("resources.index")}
                                        active={route().current(
                                            "resources.index"
                                        )}
                                    >
                                        <span className="inline-flex items-center ml-6 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 justify-between w-full">
                                            Manage Resources
                                        </span>
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route("requests")}
                                        active={route().current("requests")}
                                    >
                                        <span className="inline-flex items-center ml-6 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 justify-between w-full">
                                            Manage Requests
                                        </span>
                                    </ResponsiveNavLink>
                                </ul>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                className="flex w-full justify-between items-center border-l-4 py-2 pe-4 ps-3 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:focus:border-gray-600 dark:focus:bg-gray-700 dark:focus:text-gray-200 text-base font-medium transition duration-150 ease-in-out focus:outline-none"
                                onClick={() =>
                                    setShowingAccountsDropdown(
                                        !showingAccountsDropdown
                                    )
                                }
                            >
                                Accounts
                                <svg
                                    className="size-2"
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
                            {showingAccountsDropdown && (
                                <ul
                                    id="dropdown-example"
                                    className="space-y-2 flex flex-col gap-1"
                                >
                                    <ResponsiveNavLink
                                        href={route("manage-accounts")}
                                        active={route().current(
                                            "manage-accounts"
                                        )}
                                    >
                                        <span className="inline-flex items-center ml-6 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 justify-between w-full">
                                            Manage Accounts
                                        </span>
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route("farmer-registrations")}
                                        active={route().current(
                                            "farmer-registrations"
                                        )}
                                    >
                                        <span className="inline-flex items-center ml-6 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 justify-between w-full">
                                            Farmer Registrations
                                        </span>
                                    </ResponsiveNavLink>
                                </ul>
                            )}
                        </div>
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
                            {/* <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink> */}
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
            </nav>

            {children}
        </div>
    );
}

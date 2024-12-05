import ApplicationLogo from "@/Components/ApplicationLogo";
import { DropdownNav, ResponsiveDropdownNav } from "@/Components/DropdownNav";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const cropsDropdown = {
        title: "Crops",
        links: [
            {
                name: "Crop List",
                url: "crops.index",
            },
            {
                name: "Crop Types",
                url: "crop-types.index",
            },
            {
                name: "Pending Crops",
                url: "pending-crops",
            },
        ]
    }

    const farmsDropdown = {
        title: "Farms",
        links: [
            {
                name: "Farm List",
                url: "farms.index",
            },
        ]
    }

    const resourcesDropdown = {
        title: "Resources",
        links: [
            {
                name: "Manage Resources",
                url: "resources.index",
            },
            {
                name: "Manage Requests",
                url: "manage-requests",
            },
        ]
    };

    const accountsDropdown = {
        title: "Accounts",
        links: [
            {
                name: "Manage Accounts",
                url: "manage-accounts",
            },
            {
                name: "Farmer Registrations",
                url: "farmer-registrations",
            },
        ]
    };

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
                                <DropdownNav routes={cropsDropdown} />
                                {/* <DropdownNav routes={farmsDropdown} /> */}
                                <NavLink
                                    href={route("farms.index")}
                                    active={route().current("farms.index")}
                                >
                                    Farms
                                </NavLink>
                                <NavLink
                                    href={route("insurance.index")}
                                    active={route().current("insurance.index")}
                                >
                                    Insurance
                                </NavLink>
                                <DropdownNav routes={resourcesDropdown} />
                                <DropdownNav routes={accountsDropdown} />
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
                        <ResponsiveDropdownNav routes={cropsDropdown} />
                        <ResponsiveNavLink
                            href={route("insurance.index")}
                            active={route().current("insurance.index")}
                        >
                            Insurance
                        </ResponsiveNavLink>
                        <ResponsiveDropdownNav routes={resourcesDropdown} />
                        <ResponsiveDropdownNav routes={accountsDropdown} />
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

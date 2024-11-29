import { useState } from "react";
import NavLink from "./NavLink";
import ResponsiveNavLink from "./ResponsiveNavLink";

export function DropdownNav({ routes, method="get" }) {
    const [showingDropdown, setShowingDropdown] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <button
                className="inline-flex items-center justify-between px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 gap-8"
                onClick={() => setShowingDropdown(!showingDropdown)}
            >
                {routes.title}
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
            {showingDropdown && (
                <ul
                    id="dropdown-example"
                    className="space-y-2 flex flex-col gap-1"
                >
                    {routes.links.map((link) => (
                        <NavLink
                            key={link.name}
                            href={route(link.url)}
                            active={route().current(link.url)}
                            method={method}
                        >
                            <span className="inline-flex items-center ml-6 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 justify-between w-full">
                                {link.name}
                            </span>
                        </NavLink>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function ResponsiveDropdownNav({ routes, method="get" }) {
    const [showingDropdown, setShowingDropdown] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <button
                className="flex w-full justify-between items-center border-l-4 py-2 pe-4 ps-3 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:focus:border-gray-600 dark:focus:bg-gray-700 dark:focus:text-gray-200 text-base font-medium transition duration-150 ease-in-out focus:outline-none"
                onClick={() => setShowingDropdown(!showingDropdown)}
            >
                {routes.title}
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
            {showingDropdown && (
                <ul
                    id="dropdown-example"
                    className="space-y-2 flex flex-col gap-1"
                >
                    {routes.links.map((link) => (
                        <ResponsiveNavLink
                            key={link.name}
                            href={route(link.url)}
                            active={route().current(link.url)}
                            method={method}
                        >
                            <span className="inline-flex items-center ml-6 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 justify-between w-full">
                                {link.name}
                            </span>
                        </ResponsiveNavLink>
                    ))}
                </ul>
            )}
        </div>
    );
}

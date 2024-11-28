import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Insurance({ farmers }) {
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState({
        column: "id",
        direction: "asc",
    });
    const [tab, setTab] = useState(0);

    const startIndex = pagination.pageIndex * pagination.pageSize;

    const [shownFarmers, setShownFarmers] = useState(
        farmers
            .sort((a, b) => a.last_name.localeCompare(b.last_name))
            .slice(startIndex, startIndex + pagination.pageSize)
    );

    const totalPages = Math.ceil(shownFarmers.length / pagination.pageSize);

    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (newPageIndex) => {
        if (newPageIndex >= 0 && newPageIndex < totalPages) {
            setPagination({ ...pagination, pageIndex: newPageIndex });
        }
    };

    const handlePageNumberClick = (pageNumber) => {
        setPagination({ ...pagination, pageIndex: pageNumber });
    };

    const handleSort = (field) => {
        const direction =
            sorting.field === field && sorting.direction === "asc"
                ? "desc"
                : "asc";
        setSorting({ field, direction });
    };

    function formatDateToMMDDYYYY(date) {
        const d = new Date(date);
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const day = d.getDate().toString().padStart(2, "0");
        const year = d.getFullYear();

        return `${month}-${day}-${year}`;
    }

    useEffect(() => {
        setShownFarmers(
            farmers
                .filter(
                    (farmer) =>
                        farmer.id == search ||
                        // farmer.last_name
                        //     .toLowerCase()
                        //     .includes(search.toLowerCase()) ||
                        farmer.birthdate
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        farmer.barangay.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        farmer.crops
                            .map((crop) => crop.name.toLowerCase())
                            .includes(search.toLowerCase())
                )
                .sort((a, b) => {
                    switch (sorting.field) {
                        case "id":
                            return sorting.direction === "asc"
                                ? a.id - b.id
                                : b.id - a.id;
                        case "name":
                            return sorting.direction === "asc"
                                ? a.last_name.localeCompare(b.last_name)
                                : b.last_name.localeCompare(a.last_name);
                        case "birthdate":
                            return sorting.direction === "asc"
                                ? a.birthdate.localeCompare(b.birthdate)
                                : b.birthdate.localeCompare(a.birthdate);
                        case "barangay":
                            return sorting.direction === "asc"
                                ? a.barangay.name.localeCompare(b.barangay.name)
                                : b.barangay.name.localeCompare(
                                      a.barangay.name
                                  );
                    }

                    return 0;
                })
        );
    }, [pagination.pageIndex, farmers, sorting, search]);

    return (
        <AuthenticatedLayout>
            <Head title="Profiles" />

            <div className="w-screen px-6 lg:px-8 py-12 gap-8 flex flex-col">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-full h-10 w-1/2 border-gray-400 ps-4"
                    placeholder="Search..."
                />
                <div className="flex flex-col gap-2">
                    <div className="w-full flex justify-between">
                        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                            <li className="me-2">
                                <button
                                    className={`inline-block p-4 hover:text-secondary-light outline:border-red-500 ${
                                        tab == 0 &&
                                        "text-secondary-light dark:text-secondary-dark"
                                    }`}
                                    onClick={() => setTab(0)}
                                >
                                    Pending
                                </button>
                            </li>
                            <li className="me-2">
                                <button
                                    className={`inline-block p-4 hover:text-secondary-light outline:border-red-500 ${
                                        tab == 1 &&
                                        "text-secondary-light dark:text-secondary-dark"
                                    }`}
                                    onClick={() => setTab(1)}
                                >
                                    Approved
                                </button>
                            </li>
                            <li className="me-2">
                                <button
                                    className={`inline-block p-4 hover:text-secondary-light outline:border-red-500 ${
                                        tab == 2 &&
                                        "text-secondary-light dark:text-secondary-dark"
                                    }`}
                                    onClick={() => setTab(2)}
                                >
                                    Declined
                                </button>
                            </li>
                        </ul>

                        <NavLink>
                            <button className="border-2 border-secondary-light text-secondary-light hover:bg-secondary-light hover:text-white px-12 py-2 rounded-lg">
                                Print
                            </button>
                        </NavLink>
                    </div>
                    <div className="relative overflow-x-auto shadow-md">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-base-color uppercase bg-secondary-light dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            ID
                                            <button
                                                onClick={() => handleSort("id")}
                                            >
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Name
                                            <button
                                                onClick={() =>
                                                    handleSort("name")
                                                }
                                            >
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Birthdate
                                            <button
                                                onClick={() =>
                                                    handleSort("birthdate")
                                                }
                                            >
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Barangay
                                            <button
                                                onClick={() =>
                                                    handleSort("barangay")
                                                }
                                            >
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Types of Crops
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            {tab == 0
                                                ? "Attachment"
                                                : "Date Applied"}
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center justify-center">
                                            {tab == 0
                                                ? "Action"
                                                : tab == 1
                                                ? "Date Approved"
                                                : "Reason"}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {shownFarmers
                                    .slice(
                                        startIndex,
                                        startIndex + pagination.pageSize
                                    )
                                    .map((farmer) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            key={farmer.id}
                                        >
                                            <td className="px-6 py-4">
                                                {farmer.id}
                                            </td>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {farmer.last_name},{" "}
                                                {farmer.first_name}{" "}
                                                {farmer.middle_name ??
                                                    undefined}
                                            </th>
                                            <td className="px-6 py-4">
                                                {formatDateToMMDDYYYY(
                                                    farmer.birthdate
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {farmer.barangay.name}
                                            </td>
                                            <td className="py-4 grid grid-cols-4 gap-2 w-fit">
                                                {farmer.crops &&
                                                    farmer.crops.map((crop) => (
                                                        <span
                                                            key={crop.id}
                                                            className={`w-12 flex justify-center text-xs leading-5 font-semibold rounded-full text-black`}
                                                            style={{
                                                                backgroundColor:
                                                                    crop.color,
                                                            }}
                                                        >
                                                            {crop.name}
                                                        </span>
                                                    ))}
                                            </td>
                                            <td className="px-6 py-4">
                                                {tab == 0
                                                    ? "Image"
                                                    : "11-23-2024"}
                                            </td>
                                            <td className="px-6 py-4 flex items-center justify-center gap-1">
                                                {tab == 0 ? (
                                                    <>
                                                        <button
                                                            href="#"
                                                            className="font-medium flex gap-1 items-center text-emerald-500 hover:underline p-2 border-2 border-emerald-600 dark:border-emerald-500 hover:text-white hover:bg-emerald-600 dark:hover:bg-emerald-500 rounded-md"
                                                        >
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z"></path>
                                                            </svg>
                                                            Approve
                                                        </button>
                                                    </>
                                                ) : tab == 1 ? (
                                                    "11-30-2024"
                                                ) : (
                                                    "Image not clear"
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <nav
                            className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
                            aria-label="Table navigation"
                        >
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                                Showing{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {pagination.pageIndex *
                                        pagination.pageSize +
                                        1}
                                    -
                                    {pagination.pageIndex *
                                        pagination.pageSize +
                                        pagination.pageSize}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {shownFarmers.length}
                                </span>
                            </span>
                            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                <li>
                                    <button
                                        onClick={() =>
                                            handlePageChange(
                                                pagination.pageIndex - 1
                                            )
                                        }
                                        className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                                            pagination.pageIndex === 0 &&
                                            "cursor-not-allowed opacity-50"
                                        }`}
                                    >
                                        Previous
                                    </button>
                                </li>
                                {pageNumbers.map((pageNumber) => (
                                    <li key={pageNumber}>
                                        <button
                                            onClick={() =>
                                                handlePageNumberClick(
                                                    pageNumber
                                                )
                                            }
                                            className={`${
                                                pageNumber !==
                                                pagination.pageIndex
                                                    ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                    : "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                            }`}
                                        >
                                            {pageNumber + 1}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={() =>
                                            handlePageChange(
                                                pagination.pageIndex + 1
                                            )
                                        }
                                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                                            pagination.pageIndex ===
                                                totalPages - 1 &&
                                            "cursor-not-allowed opacity-50"
                                        }`}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

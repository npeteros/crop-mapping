import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dashboard({ statistics, barangays }) {
    const [selectedInfo, setSelectedInfo] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [sorting, setSorting] = useState({
        column: "name",
        direction: "asc",
    });

    const startIndex = pagination.pageIndex * pagination.pageSize;

    const [shownBarangays, setShownBarangays] = useState(
        barangays
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(startIndex, startIndex + pagination.pageSize)
    );

    const totalPages = Math.ceil(shownBarangays.length / pagination.pageSize);

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

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedInfo(null);
    };

    useEffect(() => {
        const nextIndex = pagination.pageIndex * pagination.pageSize;
        setShownBarangays(
            barangays
                .filter(
                    (barangay) =>
                        barangay.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        barangay.users_count == search
                )
                .sort((a, b) => {
                    let compareA, compareB;

                    if (sorting.field === "name") {
                        compareA = a.name.toLowerCase();
                        compareB = b.name.toLowerCase();
                        return sorting.direction === "asc"
                            ? compareA.localeCompare(compareB)
                            : compareB.localeCompare(compareA);
                    } else if (sorting.field === "farmer_count") {
                        compareA = a.users_count;
                        compareB = b.users_count;
                        return sorting.direction === "asc"
                            ? compareA - compareB
                            : compareB - compareA;
                    }

                    return 0;
                })
        );
    }, [pagination.pageIndex, barangays, sorting, search]);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="w-screen sm:px-6 lg:px-8 py-12 gap-8 flex flex-col">
                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold mb-4">
                                {selectedInfo.name}
                            </h2>
                            <div className="mb-4">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs uppercase">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <div className="flex items-center">
                                                    ID
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <div className="flex items-center">
                                                    Name
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statistics.total_farmers
                                            .filter(
                                                (farmer) =>
                                                    farmer.barangay_id ==
                                                    selectedInfo.id
                                            )
                                            .slice(0, 10)
                                            .map((farmer) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                    key={farmer.id}
                                                >
                                                    <td
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {farmer.id}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {farmer.name}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-3 gap-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 flex flex-col items-center text-gray-900 dark:text-gray-100">
                            <span className="text-xl">Total Barangays</span>
                            <span className="font-bold text-3xl">
                                {statistics.total_barangays}
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 flex flex-col items-center text-gray-900 dark:text-gray-100">
                            <span className="text-xl">Total Farmers</span>
                            <span className="font-bold text-3xl">
                                {statistics.total_farmers.length}
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 flex flex-col items-center text-gray-900 dark:text-gray-100">
                            <span className="text-xl">Total Crops</span>
                            <span className="font-bold text-3xl">{statistics.total_crops}</span>
                        </div>
                    </div>
                </div>

                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-full h-10 w-1/2 border-gray-400 ps-4"
                    placeholder="Search..."
                />

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-base uppercase bg-secondary-light dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Barangay
                                        <button
                                            onClick={() => handleSort("name")}
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
                                        Farmer Count
                                        <button
                                            onClick={() =>
                                                handleSort("farmer_count")
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
                            </tr>
                        </thead>
                        <tbody>
                            {shownBarangays
                                .slice(
                                    startIndex,
                                    startIndex + pagination.pageSize
                                )
                                .map((barangay) => (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        key={barangay.id}
                                        onClick={() => {
                                            setSelectedInfo(barangay);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {barangay.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {barangay.users_count}
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
                                {pagination.pageIndex * pagination.pageSize + 1}
                                -
                                {pagination.pageIndex * pagination.pageSize +
                                    pagination.pageSize}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {shownBarangays.length}
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
                                            handlePageNumberClick(pageNumber)
                                        }
                                        className={`${
                                            pageNumber !== pagination.pageIndex
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
        </AuthenticatedLayout>
    );
}

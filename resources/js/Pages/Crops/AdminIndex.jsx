import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Profiles({ crops }) {
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState({
        column: "id",
        direction: "asc",
    });

    const startIndex = pagination.pageIndex * pagination.pageSize;

    const [shownCrops, setShownCrops] = useState(
        crops
            .sort((a, b) => a.id - b.id)
            .slice(startIndex, startIndex + pagination.pageSize)
    );

    const totalPages = Math.ceil(shownCrops.length / pagination.pageSize);

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
        setShownCrops(
            crops
                .filter(
                    (crop) =>
                        crop.id.toString().includes(search) ||
                        crop.user.last_name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        crop.user.first_name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        (crop.user.middle_name &&
                            crop.user.middle_name
                                .toLowerCase()
                                .includes(search.toLowerCase())) ||
                        crop.crop_type.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        crop.planting_date
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        crop.land_area.toString().includes(search)
                )
                .sort((a, b) => {
                    switch (sorting.field) {
                        case "id":
                            return sorting.direction === "asc"
                                ? a.id - b.id
                                : b.id - a.id;
                        case "farmer":
                            return sorting.direction === "asc"
                                ? a.user.last_name.localeCompare(
                                      b.user.last_name
                                  )
                                : b.user.last_name.localeCompare(
                                      a.user.last_name
                                  );
                        case "cropType":
                            return sorting.direction === "asc"
                                ? a.crop_type.name.localeCompare(
                                      b.crop_type.name
                                  )
                                : b.crop_type.name.localeCompare(
                                      a.crop_type.name
                                  );
                        case "plantingDate":
                            return sorting.direction === "asc"
                                ? a.planting_date.localeCompare(b.planting_date)
                                : b.planting_date.localeCompare(
                                      a.planting_date
                                  );
                        case "landArea":
                            return sorting.direction === "asc"
                                ? a.land_area - b.land_area
                                : b.land_area - a.land_area;
                    }

                    return 0;
                })
        );
    }, [pagination.pageIndex, crops, sorting, search]);

    return (
        <AuthenticatedLayout>
            <Head title="Crops" />

            <div className="w-screen px-6 lg:px-8 py-12 gap-8 flex flex-col">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-full h-10 w-1/2 border-gray-400 ps-4"
                    placeholder="Search..."
                />
                <div className="flex flex-col gap-2">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-base-color uppercase bg-secondary-light dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Crop ID
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
                                            Farmer
                                            <button
                                                onClick={() =>
                                                    handleSort("farmer")
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
                                            Crop Type
                                            <button
                                                onClick={() =>
                                                    handleSort("cropType")
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
                                            Planting Date
                                            <button
                                                onClick={() =>
                                                    handleSort("plantingDate")
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
                                            Land Area
                                            <button
                                                onClick={() =>
                                                    handleSort("landArea")
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
                                {shownCrops
                                    .slice(
                                        startIndex,
                                        startIndex + pagination.pageSize
                                    )
                                    .map((crop) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            key={crop.id}
                                        >
                                            <td className="px-6 py-4">
                                                {crop.id}
                                            </td>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {crop.user.last_name},{" "}
                                                {crop.user.first_name}{" "}
                                                {crop.user.middle_name ??
                                                    undefined}
                                            </th>
                                            <td className="px-6 py-4">
                                                {crop.crop_type.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatDateToMMDDYYYY(
                                                    crop.planting_date
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {crop.land_area}
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
                                    {shownCrops.length}
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

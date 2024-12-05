import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import AddModal from "@/Components/AddModal";

export default function CropTypes({ farms, users, precreatedUsers }) {
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState({
        column: "id",
        direction: "asc",
    });

    const combinedUsers = [...users, ...precreatedUsers].filter(
        (user, index, self) => index === self.findIndex((u) => u.id === user.id)
    );

    const startIndex = pagination.pageIndex * pagination.pageSize;

    const [shownFarms, setShownFarms] = useState(
        farms
            .sort((a, b) => a.id - b.id)
            .slice(startIndex, startIndex + pagination.pageSize)
    );

    const totalPages = Math.ceil(shownFarms.length / pagination.pageSize);

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
        setShownFarms(
            farms
                .filter(
                    (farm) =>
                        farm.id.toString().includes(search) ||
                        farm.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        farm.color.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, b) => {
                    switch (sorting.field) {
                        case "id":
                            return sorting.direction === "asc"
                                ? a.id - b.id
                                : b.id - a.id;
                        case "name":
                            return sorting.direction === "asc"
                                ? a.name.localeCompare(b.name)
                                : b.name.localeCompare(a.name);
                        case "color":
                            return sorting.direction === "asc"
                                ? a.color.localeCompare(b.color)
                                : b.color.localeCompare(a.color);
                    }

                    return 0;
                })
        );
    }, [pagination.pageIndex, farms, sorting, search]);

    const { data, setData, get, processing, errors, reset } = useForm({
        user: "",
    });

    const submit = (e) => {
        e.preventDefault();

        get(route("farms.create"), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Crop Types" />

            <div className="w-screen px-6 lg:px-8 py-12 gap-8 flex flex-col">
                <div className="w-full flex justify-between items-center">
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-full h-10 w-1/2 border-gray-400 ps-4"
                        placeholder="Search..."
                    />
                    <AddModal
                        title="Add New Farm"
                        onSubmit={submit}
                        processing={processing}
                    >
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">User: </label>
                            <select
                                value={data.user}
                                onChange={(e) =>
                                    setData("user", e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Select User
                                </option>
                                {combinedUsers.map((user) => (
                                    <option key={user.id} value={user.rsba}>
                                        {user.last_name}, {user.first_name}{" "}
                                        {user.middle_name ?? undefined}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.user} />
                        </div>
                    </AddModal>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                            Farmer
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
                                            Color
                                            <button
                                                onClick={() =>
                                                    handleSort("color")
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
                                            Land Assigned
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Action
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {shownFarms
                                    .slice(
                                        startIndex,
                                        startIndex + pagination.pageSize
                                    )
                                    .map((farm) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            key={farm.id}
                                        >
                                            <td className="px-6 py-4">
                                                {farm.id}
                                            </td>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {farm.user.last_name},{" "}
                                                {farm.user.first_name}{" "}
                                                {farm.user.middle_name ??
                                                    undefined}
                                            </th>
                                            <td
                                                className="px-6 py-4"
                                                style={{ color: farm.color }}
                                            >
                                                {farm.color}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={route("farms.show", {
                                                        farm: farm.id,
                                                    })}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                {/* <AdminEditCropType
                                                    farmType={farm}
                                                />{" "} */}
                                                /{" "}
                                                <Link
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                    href={route(
                                                        "farms.destroy",
                                                        farm.id
                                                    )}
                                                    method="delete"
                                                >
                                                    Delete
                                                </Link>
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
                                    {shownFarms.length}
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

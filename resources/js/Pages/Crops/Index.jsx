import AddModal from "@/Components/AddModal";
import FarmerNavbar from "@/Components/FarmerNavbar";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import NavLink from "@/Components/NavLink";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import UserEditCrop from "@/Pages/Crops/UserEditCrop";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Profiles({ crops, cropTypes }) {
    const user = usePage().props.auth.user;
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

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: user.id,
        crop_type_id: 1,
        planting_date: "",
        harvest_date: "",
        land_area: "",
    });

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

    const submit = (e) => {
        e.preventDefault();

        post(route("crops.store"));
    };

    return (
        <>
            <Head title="Crops" />

            <FarmerNavbar user={user} />

            <div className="my-8 flex flex-col gap-2 max-w-7xl mx-auto">
                <div className="flex flex-col gap-2">
                    <div className="w-full flex justify-between">
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-full h-10 w-1/2 border-gray-400 ps-4"
                            placeholder="Search..."
                        />
                        <div className="inline-flex items-center px-1 pt-1 text-sm">
                            <AddModal
                                title={"Add New Crop"}
                                onSubmit={submit}
                                processing={processing}
                                submitText="Select Farm"
                            >
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name">Crop Type: </label>
                                    <select
                                        value={data.crop_type_id}
                                        onChange={(e) =>
                                            setData(
                                                "crop_type_id",
                                                e.target.value
                                            )
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    >
                                        {cropTypes.map((cropType) => (
                                            <option
                                                key={cropType.id}
                                                value={cropType.id}
                                            >
                                                {cropType.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.crop_type_id} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name">
                                        Planting Date:{" "}
                                    </label>
                                    <input
                                        type="date"
                                        value={data.planting_date}
                                        autoComplete="date"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "planting_date",
                                                e.target.value
                                            )
                                        }
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    <InputError
                                        message={errors.planting_date}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name">Harvest Date: </label>
                                    <input
                                        type="date"
                                        value={data.harvest_date}
                                        autoComplete="date"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "harvest_date",
                                                e.target.value
                                            )
                                        }
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    <InputError message={errors.harvest_date} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name">
                                        Land Area (in hectares):{" "}
                                    </label>
                                    <input
                                        type="number"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={data.land_area}
                                        onChange={(e) =>
                                            setData("land_area", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError message={errors.land_area} />
                                </div>
                            </AddModal>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-base-color uppercase bg-secondary-light dark:bg-gray-700 dark:text-gray-400">
                                <tr>
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
                                            Harvest Date
                                            <button
                                                onClick={() =>
                                                    handleSort("harvestDate")
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
                                            Status
                                            <button
                                                onClick={() =>
                                                    handleSort("status")
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
                                            Action
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
                                                {crop.crop_type.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatDateToMMDDYYYY(
                                                    crop.planting_date
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatDateToMMDDYYYY(
                                                    crop.harvest_date
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {crop.approved
                                                    ? "Approved"
                                                    : "Pending"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <UserEditCrop crop={crop} />
                                                /{" "}
                                                <Link
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                    href={route(
                                                        "crops.destroy",
                                                        crop.id
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
        </>
    );
}

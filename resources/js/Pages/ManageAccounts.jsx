import AddModal from "@/Components/AddModal";
import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DeleteAccount from "./DeleteAccount";

export default function Profiles({ precreated, users, barangays }) {
    const { data, setData, post, processing, errors } = useForm({
        rsba: "",
        lastName: "",
        firstName: "",
        middleName: "",
        email: "",
        barangayId: "",
        password: "",
    });

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

    const [precreatedUsers, setShownPrecreatedUsers] = useState(
        precreated
            .sort((a, b) => a.last_name.localeCompare(b.last_name))
            .slice(startIndex, startIndex + pagination.pageSize)
    );

    const [activeUsers, setShownActiveUsers] = useState(
        users
            .sort((a, b) => a.last_name.localeCompare(b.last_name))
            .slice(startIndex, startIndex + pagination.pageSize)
    );

    const totalPages = Math.ceil(
        tab == 0
            ? precreatedUsers.length
            : activeUsers.length / pagination.pageSize
    );

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
        switch (tab) {
            case 0:
                return setShownPrecreatedUsers(
                    precreatedUsers
                        .filter(
                            (farmer) =>
                                farmer.rsba == search ||
                                farmer.last_name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                farmer.barangay.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                farmer.email
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
                                        ? a.rsba - b.rsba
                                        : b.rsba - a.rsba;
                                case "name":
                                    return sorting.direction === "asc"
                                        ? a.last_name.localeCompare(b.last_name)
                                        : b.last_name.localeCompare(
                                              a.last_name
                                          );
                                case "barangay":
                                    return sorting.direction === "asc"
                                        ? a.barangay.name.localeCompare(
                                              b.barangay.name
                                          )
                                        : b.barangay.name.localeCompare(
                                              a.barangay.name
                                          );
                                case "email":
                                    return sorting.direction === "asc"
                                        ? a.email.localeCompare(b.email)
                                        : b.email.localeCompare(a.email);
                            }

                            return 0;
                        })
                );
            case 1:
                return setShownActiveUsers(
                    users
                        .filter(
                            (farmer) =>
                                farmer.rsba == search ||
                                farmer.last_name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                farmer.barangay.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                farmer.email
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
                                        ? a.rsba - b.rsba
                                        : b.rsba - a.rsba;
                                case "name":
                                    return sorting.direction === "asc"
                                        ? a.last_name.localeCompare(b.last_name)
                                        : b.last_name.localeCompare(
                                              a.last_name
                                          );
                                case "barangay":
                                    return sorting.direction === "asc"
                                        ? a.barangay.name.localeCompare(
                                              b.barangay.name
                                          )
                                        : b.barangay.name.localeCompare(
                                              a.barangay.name
                                          );
                                case "email":
                                    return sorting.direction === "asc"
                                        ? a.email.localeCompare(b.email)
                                        : b.email.localeCompare(a.email);
                            }

                            return 0;
                        })
                );
        }
    }, [pagination.pageIndex, users, sorting, search]);

    function getCropTypeNamesForUser(user) {
        if (!user || !user.crops) {
            return ""; // Return an empty string if the user object or "crops" key is missing
        }

        const cropTypesArray = Array.from(
            new Set(user.crops.map((crop) => crop.crop_type))
        );

        return (
            <div className="flex gap-1">
                {cropTypesArray.map((cropType) => (
                    <div
                        key={cropType.id}
                        className={`rounded-full shadow-md text-center w-fit px-4 bg-neutral-400`}
                        style={{
                            backgroundColor: cropType.color,
                        }}
                    >
                        <span className="text-black font-semibold text-xs">
                            {cropType.name}
                        </span>
                    </div>
                ))}
            </div>
        );
    }

    const submit = (e) => {
        e.preventDefault();

        post(route("precreated-users.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manage Accounts" />
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
                                    Precreated
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
                                    Active
                                </button>
                            </li>
                        </ul>

                        <div className="inline-flex items-center px-1 pt-1 text-sm">
                            <AddModal
                                title={"Precreate an Account"}
                                onSubmit={submit}
                                processing={processing}
                                submitText="Draw Farm"
                            >
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name">RSBA Number: </label>
                                    <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={data.rsba}
                                        onChange={(e) =>
                                            setData("rsba", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError message={errors.rsba} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name">Farmer Name: </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={data.lastName}
                                                onChange={(e) =>
                                                    setData(
                                                        "lastName",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Last Name"
                                                required
                                            />
                                            <InputError
                                                message={errors.lastName}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={data.firstName}
                                                onChange={(e) =>
                                                    setData(
                                                        "firstName",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="First Name"
                                                required
                                            />
                                            <InputError
                                                message={errors.firstName}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={data.middleName}
                                                onChange={(e) =>
                                                    setData(
                                                        "middleName",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Middle Name"
                                            />
                                            <InputError
                                                message={errors.middleName}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name">Email: </label>
                                    <input
                                        type="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name">Barangay: </label>
                                    <select
                                        value={data.barangayId}
                                        onChange={(e) =>
                                            setData(
                                                "barangayId",
                                                e.target.value
                                            )
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    >
                                        {barangays.map((barangay) => (
                                            <option
                                                key={barangay.id}
                                                value={barangay.id}
                                            >
                                                {barangay.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.barangayId} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name">
                                        Temporary Password:{" "}
                                    </label>
                                    <input
                                        type="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError message={errors.password} />
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
                                            RSBA Number
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
                                            Email
                                            <button
                                                onClick={() =>
                                                    handleSort("email")
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
                                    {tab == 0 ? (
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
                                    ) : (
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                Crops Grown
                                            </div>
                                        </th>
                                    )}
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Action
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tab == 0
                                    ? precreatedUsers
                                          .slice(
                                              startIndex,
                                              startIndex + pagination.pageSize
                                          )
                                          .map((farmer) => (
                                              <tr
                                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                  key={farmer.rsba}
                                              >
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
                                                      {farmer.rsba}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      {farmer.barangay.name}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      {farmer.email}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      Pending Registration
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                          Edit
                                                      </Link>{" "}
                                                      /{" "}
                                                      <DeleteAccount
                                                          userId={farmer.id}
                                                      />
                                                  </td>
                                              </tr>
                                          ))
                                    : activeUsers
                                          .slice(
                                              startIndex,
                                              startIndex + pagination.pageSize
                                          )
                                          .map((farmer) => (
                                              <tr
                                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                  key={farmer.rsba}
                                              >
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
                                                      {farmer.rsba}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      {farmer.barangay.name}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      {farmer.email}
                                                  </td>

                                                  <td className="py-4 grid grid-cols-4 gap-2 w-fit">
                                                      {getCropTypeNamesForUser(
                                                          farmer
                                                      )}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                          Edit
                                                      </Link>{" "}
                                                      /{" "}
                                                      <DeleteAccount
                                                          userId={farmer.id}
                                                      />
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
                                    {tab == 0
                                        ? precreatedUsers.length
                                        : activeUsers.length}
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

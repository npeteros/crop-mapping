import FarmerNavbar from "@/Components/FarmerNavbar";
import Modal from "@/Components/Modal";
import NavLink from "@/Components/NavLink";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Resources({ fertilizers, equipments, seeds }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, processing, errors } = useForm({
        farmerName: user.name,
        address: user.address,
        contact: "",
        area: 0,
        category: "fertilizer",
        resource: "",
    });

    console.log(data);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState({
        column: "name",
        direction: "asc",
    });
    const [tab, setTab] = useState(0);

    const startIndex = pagination.pageIndex * pagination.pageSize;

    const [shownFertilizers, setShownFertilizers] = useState(
        fertilizers
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(startIndex, startIndex + pagination.pageSize)
    );

    const [shownEquipments, setShownEquipments] = useState(
        equipments
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(startIndex, startIndex + pagination.pageSize)
    );

    const [shownSeeds, setShownSeeds] = useState(
        seeds
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(startIndex, startIndex + pagination.pageSize)
    );

    const totalPages = Math.ceil(tab == 0 ? shownFertilizers.length : tab == 1 ? shownEquipments.length : shownSeeds.length / pagination.pageSize);

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

    useEffect(() => {
        switch (tab) {
            case 0: {
                return setShownFertilizers(
                    fertilizers
                        .filter(
                            (fertilizer) =>
                                fertilizer.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                fertilizer.type
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                String(fertilizer.stock).includes(search)
                        )
                        .sort((a, b) => {
                            switch (sorting.field) {
                                case "name":
                                    return sorting.direction === "asc"
                                        ? a.name.localeCompare(b.name)
                                        : b.name.localeCompare(a.name);
                                case "type":
                                    return sorting.direction === "asc"
                                        ? a.type.localeCompare(b.type)
                                        : b.type.localeCompare(a.type);
                                case "stock":
                                    return sorting.direction === "asc"
                                        ? a.stock - b.stock
                                        : b.stock - a.stock;
                            }

                            return 0;
                        })
                );
            }

            case 1: {
                return setShownEquipments(
                    equipments
                        .filter(
                            (equipment) =>
                                equipment.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                String(equipment.quantity).includes(search)
                        )
                        .sort((a, b) => {
                            switch (sorting.field) {
                                case "name":
                                    return sorting.direction === "asc"
                                        ? a.name.localeCompare(b.name)
                                        : b.name.localeCompare(a.name);
                                case "quantity":
                                    return sorting.direction === "asc"
                                        ? a.quantity - b.quantity
                                        : b.quantity - a.quantity;
                            }

                            return 0;
                        })
                );
            }

            case 2: {
                return setShownSeeds(
                    seeds
                        .filter(
                            (seed) =>
                                seed.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                String(seed.stock).includes(search)
                        )
                        .sort((a, b) => {
                            switch (sorting.field) {
                                case "name":
                                    return sorting.direction === "asc"
                                        ? a.name.localeCompare(b.name)
                                        : b.name.localeCompare(a.name);
                                case "stock":
                                    return sorting.direction === "asc"
                                        ? a.stock - b.stock
                                        : b.stock - a.stock;
                            }

                            return 0;
                        })
                );
            }
        }
    }, [pagination.pageIndex, fertilizers, equipments, seeds, sorting, search]);

    return (
        <>
            <Head title="Apply for Insurance" />

            <FarmerNavbar user={user} />

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="2xl"
            >
                <form className="p-8 flex flex-col gap-4">
                    <span className="text-xl font-bold">
                        Request for Resources
                    </span>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Farmer Name: </label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.farmerName}
                                onChange={(e) =>
                                    setData("farmerName", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Address: </label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Contact Number: </label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.contact}
                                onChange={(e) =>
                                    setData("contact", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Resource Category: </label>
                            <select
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value={"fertilizer"}>Fertilizer</option>
                                <option value={"equipment"}>Equipment</option>
                                <option value={"seed"}>Seed</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Resource Name: </label>
                            <select
                                value={data.resource}
                                onChange={(e) =>
                                    setData("resource", e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                {data.category == "fertilizer"
                                    ? fertilizers.map((fertilizer) => (
                                          <option value={fertilizer.id}>
                                              {fertilizer.name}
                                          </option>
                                      ))
                                    : data.category == "equipment"
                                    ? equipments.map((equipment) => (
                                          <option value={equipment.id}>
                                              {equipment.name}
                                          </option>
                                      ))
                                    : data.category == "seed"
                                    ? seeds.map((seed) => (
                                          <option value={seed.id}>
                                              {seed.name}
                                          </option>
                                      ))
                                    : null}
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex justify-center gap-2">
                        <SecondaryButton onClick={() => setShowModal(false)} >Cancel</SecondaryButton>
                        <PrimaryButton>Submit</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <div className="my-8 flex flex-col gap-2 max-w-7xl mx-auto">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-full h-10 w-1/2 border-gray-400 ps-4"
                    placeholder="Search..."
                />
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
                                Fertilizers
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
                                Equipments
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
                                Seeds
                            </button>
                        </li>
                    </ul>

                    <button
                        className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-12 py-2 rounded-lg"
                        onClick={() => setShowModal(true)}
                    >
                        Request
                    </button>
                </div>
                <div className="relative overflow-x-auto shadow-md">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-base-color uppercase bg-secondary-light dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Name
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
                                        {tab == 0 ? (
                                            <>
                                                <span>Type</span>
                                                <button
                                                    onClick={() =>
                                                        handleSort("type")
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
                                            </>
                                        ) : tab == 1 ? (
                                            <>
                                                <span>Quantity</span>
                                                <button
                                                    onClick={() =>
                                                        handleSort("quantity")
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
                                            </>
                                        ) : (
                                            <>
                                                <span>Stock</span>
                                                <button
                                                    onClick={() =>
                                                        handleSort("stock")
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
                                            </>
                                        )}
                                    </div>
                                </th>
                                {tab == 0 && (
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Stocks
                                            <button
                                                onClick={() =>
                                                    handleSort("stock")
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
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {tab == 0
                                ? shownFertilizers
                                      .slice(
                                          startIndex,
                                          startIndex + pagination.pageSize
                                      )
                                      .map((fertilizer) => (
                                          <tr
                                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                              key={fertilizer.id}
                                          >
                                              <th
                                                  scope="row"
                                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                              >
                                                  {fertilizer.name}
                                              </th>
                                              <td className="px-6 py-4">
                                                  {fertilizer.type
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                      fertilizer.type.slice(1)}
                                              </td>
                                              <td className="px-6 py-4">
                                                  {fertilizer.stock}
                                              </td>
                                          </tr>
                                      ))
                                : tab == 1
                                ? shownEquipments
                                      .slice(
                                          startIndex,
                                          startIndex + pagination.pageSize
                                      )
                                      .map((equipment) => (
                                          <tr
                                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                              key={equipment.id}
                                          >
                                              <th
                                                  scope="row"
                                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                              >
                                                  {equipment.name}
                                              </th>
                                              <td className="px-6 py-4">
                                                  {equipment.quantity}
                                              </td>
                                          </tr>
                                      ))
                                : shownSeeds
                                      .slice(
                                          startIndex,
                                          startIndex + pagination.pageSize
                                      )
                                      .map((seed) => (
                                          <tr
                                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                              key={seed.id}
                                          >
                                              <th
                                                  scope="row"
                                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                              >
                                                  {seed.name}
                                              </th>
                                              <td className="px-6 py-4">
                                                  {seed.stock}
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
                                {tab == 0
                                    ? shownFertilizers.length
                                    : tab == 1
                                    ? shownEquipments.length
                                    : shownSeeds.length}
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
        </>
    );
}

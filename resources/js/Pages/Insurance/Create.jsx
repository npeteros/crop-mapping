import FarmerNavbar from "@/Components/FarmerNavbar";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Create() {
    const user = usePage().props.auth.user;

    const [page, setPage] = useState(0);
    const { data, setData, post, processing, reset, errors } = useForm({
        rsba: user.rsba,
        lastName: user.last_name,
        firstName: user.first_name,
        middleName: user.middle_name,
        sex: "",
        mobile: "",
        dob: user.birthdate,
        email: user.email,
        civilStatus: "",
        spouse: "",

        cropType: "",
        plantingSeason: "",
        plantingDate: "",
        harvestDate: "",
        cultivationArea: "",
        coverageType: "",
        sumInsured: "",

        beneficiaryNameA: "",
        beneficiaryAgeA: "",
        beneficiaryRelationshipA: "",
        beneficiaryNameB: "",
        beneficiaryAgeB: "",
        beneficiaryRelationshipB: "",

        taxDeclaration: "",
        farmImage: "",
    });
    return (
        <>
            <Head title="Apply for Insurance" />

            <FarmerNavbar user={user} />

            <div className="px-6 lg:px-0">
                {page === 0 ? (
                    <div className="my-8 flex flex-col gap-2 max-w-5xl mx-auto border-2 w-full rounded-2xl p-8">
                        <span className="text-2xl font-bold">
                            Purpose of Crop Insurance Application:
                        </span>
                        <p className="text-xl leading-loose">
                            This application aims to provide financial
                            protection to farmers against losses caused by
                            natural disasters (such as floods, droughts, and
                            pests) or market fluctuations. Crop insurance
                            ensures you can recover from unexpected events and
                            continue farming with confidence.
                        </p>
                        <p className="text-xl leading-loose">
                            By completing this application, you can:
                        </p>
                        <ul className="text-xl space-y-2 list-disc list-inside dark:text-gray-400 ms-6">
                            <li>Safeguard your crops and investments.</li>
                            <li>
                                Access compensation for damages caused by
                                unforeseen events.
                            </li>
                            <li>
                                Benefit from government-supported schemes and
                                subsidies (if applicable).
                            </li>
                            <li>
                                Contribute to a more stable and sustainable
                                agricultural community.
                            </li>
                        </ul>

                        <div className="my-8 w-full flex justify-center">
                            <button
                                onClick={() => setPage(1)}
                                className="bg-emerald-700 rounded-full px-8 py-2 text-white text-xl"
                            >
                                Proceed Application
                            </button>
                        </div>
                    </div>
                ) : page === 1 ? (
                    <div className="my-8 flex flex-col gap-2 max-w-5xl mx-auto border-2 bg-base-color w-full rounded-2xl pt-8">
                        <ol className="flex items-center w-full text-sm font-medium text-center text-neutral-800 sm:text-base px-8">
                            <li className="flex md:w-full items-center text-primary-dark dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <svg
                                        className="size-4 sm:size-6 text-xs sm:text-md me-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Personal{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Info
                                    </span>
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <span className="me-2 size-4 sm:size-6 text-xs sm:text-md flex justify-center items-center rounded-full border border-black">
                                        2
                                    </span>
                                    Crop{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Info
                                    </span>
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <span className="me-2 size-4 sm:size-6 text-xs sm:text-md flex justify-center items-center rounded-full border border-black">
                                        3
                                    </span>
                                    Beneficiaries
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <span className="me-2 size-4 sm:size-6 text-xs sm:text-md flex justify-center items-center rounded-full border border-black">
                                        4
                                    </span>
                                    Image{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Chuchu
                                    </span>
                                </span>
                            </li>
                        </ol>
                        <div className="bg-white rounded-2xl mt-2 px-8 lg:px-0">
                            <div className="w-full flex flex-col items-center gap-8 py-2">
                                <span className="text-xl">Personal Info</span>
                                <div className="grid grid-cols-10 gap-4">
                                    <div className="col-span-3" />
                                    <div className="flex flex-col gap-2 col-span-4">
                                        <label
                                            htmlFor="lastName"
                                            className="text-center"
                                        >
                                            RSBA No.
                                        </label>
                                        <input
                                            type="text"
                                            value={data.rsba}
                                            onChange={(e) =>
                                                setData("rsba", e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="col-span-3" />
                                    <div />
                                    <div className="flex flex-col gap-2 col-span-2">
                                        <label htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.lastName}
                                            onChange={(e) =>
                                                setData(
                                                    "lastName",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 col-span-2">
                                        <label htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.firstName}
                                            onChange={(e) =>
                                                setData(
                                                    "firstName",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 col-span-2">
                                        <label htmlFor="middleName">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.middleName}
                                            onChange={(e) =>
                                                setData(
                                                    "middleName",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 col-span-2">
                                        <label htmlFor="sex">Sex</label>
                                        <select
                                            value={data.sex}
                                            onChange={(e) =>
                                                setData("sex", e.target.value)
                                            }
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Gender
                                            </option>
                                            <option value="m">Male</option>
                                            <option value="f">Female</option>
                                        </select>
                                    </div>
                                    <div />
                                    <div className="col-span-2" />
                                    <div className="flex flex-col gap-2 col-span-2">
                                        <label htmlFor="mobile">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="text"
                                            value={data.mobile}
                                            onChange={(e) =>
                                                setData(
                                                    "mobile",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 col-span-2">
                                        <label htmlFor="mobile">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            value={data.dob}
                                            onChange={(e) =>
                                                setData("dob", e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 col-span-2">
                                        <label htmlFor="mobile">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2" />
                                    <div className="col-span-3" />
                                    <div
                                        className={`flex flex-col gap-2 ${
                                            data.civilStatus == "married"
                                                ? "col-span-2"
                                                : "col-span-4"
                                        }`}
                                    >
                                        <label htmlFor="civilStatus">
                                            Civil Status
                                        </label>
                                        <select
                                            value={data.civilStatus}
                                            onChange={(e) =>
                                                setData(
                                                    "civilStatus",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Civil Status
                                            </option>
                                            <option value="single">
                                                Single
                                            </option>
                                            <option value="married">
                                                Married
                                            </option>
                                            <option value="widowed">
                                                Widow/er
                                            </option>
                                            <option value="separated">
                                                Separated
                                            </option>
                                        </select>
                                    </div>
                                    <div
                                        className={`${
                                            data.civilStatus == "married"
                                                ? "flex"
                                                : "hidden"
                                        } flex-col gap-2 col-span-2`}
                                    >
                                        <label htmlFor="mobile">
                                            Spouse Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.spouse}
                                            onChange={(e) =>
                                                setData(
                                                    "spouse",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    className="bg-blue-600 px-8 py-1 text-white rounded-full"
                                    onClick={() => setPage(2)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                ) : page === 2 ? (
                    <div className="my-8 flex flex-col gap-2 max-w-5xl mx-auto border-2 bg-base-color w-full rounded-2xl pt-8">
                        <ol className="flex items-center w-full text-sm font-medium text-center text-neutral-800 sm:text-base px-8">
                            <li className="flex md:w-full items-center text-primary-dark dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <svg
                                        className="size-4 sm:size-6 text-xs sm:text-md me-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Personal{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Info
                                    </span>
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <svg
                                        className="size-4 sm:size-6 text-xs sm:text-md me-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Crop{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Info
                                    </span>
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <span className="me-2 size-4 sm:size-6 text-xs sm:text-md flex justify-center items-center rounded-full border border-black">
                                        3
                                    </span>
                                    Beneficiaries
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <span className="me-2 size-4 sm:size-6 text-xs sm:text-md flex justify-center items-center rounded-full border border-black">
                                        4
                                    </span>
                                    Image{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Chuchu
                                    </span>
                                </span>
                            </li>
                        </ol>
                        <div className="bg-white rounded-2xl mt-2 px-8 lg:px-0">
                            <div className="w-full flex flex-col items-center gap-4 py-2">
                                <span className="text-xl">
                                    Crop Information
                                </span>
                                <div className="grid grid-cols-3 gap-4 w-full px-0 lg:px-8">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="civilStatus">
                                            Type of Crop
                                        </label>
                                        <select
                                            value={data.cropType}
                                            onChange={(e) =>
                                                setData(
                                                    "cropType",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Type of Crop
                                            </option>
                                            <option value="rice">Rice</option>
                                            <option value="corn">Corn</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="civilStatus">
                                            Planting Season
                                        </label>
                                        <select
                                            value={data.plantingSeason}
                                            onChange={(e) =>
                                                setData(
                                                    "plantingSeason",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Planting Season
                                            </option>
                                            <option value="wet">Wet</option>
                                            <option value="dry">Dry</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="civilStatus">
                                            Planting Date
                                        </label>
                                        <input
                                            type="date"
                                            value={data.plantingDate}
                                            onChange={(e) =>
                                                setData(
                                                    "plantingDate",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="civilStatus">
                                            Expected Harvest Date
                                        </label>
                                        <input
                                            type="date"
                                            value={data.harvestDate}
                                            onChange={(e) =>
                                                setData(
                                                    "harvestDate",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="civilStatus">
                                            Area of Cultivation
                                        </label>
                                        <input
                                            type="number"
                                            value={data.cultivationArea}
                                            onChange={(e) =>
                                                setData(
                                                    "cultivationArea",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="(in hectares)"
                                            min={0}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="civilStatus">
                                            Type of Coverage
                                        </label>
                                        <select
                                            value={data.coverageType}
                                            onChange={(e) =>
                                                setData(
                                                    "coverageType",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Type of Coverage
                                            </option>
                                            <option value="multirisk">
                                                Multi-Risk
                                            </option>
                                            <option value="disaster">
                                                Natural Disaster
                                            </option>
                                        </select>
                                    </div>
                                    <div />
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="civilStatus">
                                            Desired Sum Insured
                                        </label>
                                        <input
                                            type="number"
                                            value={data.sumInsured}
                                            onChange={(e) =>
                                                setData(
                                                    "sumInsured",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="(in PHP)"
                                            min={0}
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    className="bg-blue-600 px-8 py-1 text-white rounded-full"
                                    onClick={() => setPage(3)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                ) : page === 3 ? (
                    <div className="my-8 flex flex-col gap-2 max-w-5xl mx-auto border-2 bg-base-color w-full rounded-2xl pt-8">
                        <ol className="flex items-center w-full text-sm font-medium text-center text-neutral-800 sm:text-base px-8">
                            <li className="flex md:w-full items-center text-primary-dark dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <svg
                                        className="size-4 sm:size-6 text-xs sm:text-md me-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Personal{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Info
                                    </span>
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <svg
                                        className="size-4 sm:size-6 text-xs sm:text-md me-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Crop{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Info
                                    </span>
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <svg
                                        className="size-4 sm:size-6 text-xs sm:text-md me-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Beneficiaries
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <span className="me-2 size-4 sm:size-6 text-xs sm:text-md flex justify-center items-center rounded-full border border-black">
                                        4
                                    </span>
                                    Image{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Chuchu
                                    </span>
                                </span>
                            </li>
                        </ol>
                        <div className="bg-white rounded-2xl mt-2 px-8 lg:px-0">
                            <div className="w-full flex flex-col items-center gap-4 py-2">
                                <span className="text-xl">
                                    Crop Information
                                </span>
                                <div className="flex flex-col gap-6 w-full px-0 lg:px-8">
                                    <div className="flex flex-col gap-2">
                                        <span>(a) Primary</span>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="civilStatus">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        data.beneficiaryNameA
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "beneficiaryNameA",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="civilStatus">
                                                    Age
                                                </label>
                                                <input
                                                    type="number"
                                                    value={data.beneficiaryAgeA}
                                                    onChange={(e) =>
                                                        setData(
                                                            "beneficiaryAgeA",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="civilStatus">
                                                    Relationship
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        data.beneficiaryRelationshipA
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "beneficiaryRelationshipA",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap">
                                        <span>(b) Secondary</span>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="civilStatus">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        data.beneficiaryNameB
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "beneficiaryNameB",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="civilStatus">
                                                    Age
                                                </label>
                                                <input
                                                    type="number"
                                                    value={data.beneficiaryAgeB}
                                                    onChange={(e) =>
                                                        setData(
                                                            "beneficiaryAgeB",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="civilStatus">
                                                    Relationship
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        data.beneficiaryRelationshipB
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "beneficiaryRelationshipB",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="bg-blue-600 px-8 py-1 text-white rounded-full"
                                    onClick={() => setPage(4)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                ) : page === 4 ? (
                    <div className="my-8 flex flex-col gap-2 max-w-5xl mx-auto border-2 bg-base-color w-full rounded-2xl pt-8">
                        <ol className="flex items-center w-full text-sm font-medium text-center text-neutral-800 sm:text-base px-8">
                            <li className="flex md:w-full items-center text-primary-dark dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <svg
                                        className="size-4 sm:size-6 text-xs sm:text-md me-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Personal{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Info
                                    </span>
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <svg
                                        className="size-4 sm:size-6 text-xs sm:text-md me-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Crop{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Info
                                    </span>
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <svg
                                        className="size-4 sm:size-6 text-xs sm:text-md me-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Beneficiaries
                                </span>
                            </li>
                            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                                    <svg
                                        className="size-4 sm:size-6 text-xs sm:text-md me-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Image{" "}
                                    <span className="hidden sm:inline-flex sm:ms-1">
                                        Chuchu
                                    </span>
                                </span>
                            </li>
                        </ol>
                        <div className="bg-white rounded-2xl mt-2 px-8 lg:px-0">
                            <div className="w-full flex flex-col items-center gap-4 py-2">
                                <span className="text-xl">
                                    Crop Information
                                </span>
                                <div className="flex flex-col gap-6 w-full px-0 lg:px-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="civilStatus">
                                                Upload Tax Declaration Image
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setData(
                                                        "taxDeclaration",
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="civilStatus">
                                                Upload Farm Image
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setData(
                                                        "farmImage",
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="bg-green-600 px-8 py-1 text-white rounded-full"
                                    onClick={() => setPage(3)}
                                >
                                    Submit Application
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}

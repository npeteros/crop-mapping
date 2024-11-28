import FarmerNavbar from "@/Components/FarmerNavbar";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ barangays }) {
    const user = usePage().props.auth.user;

    const [page, setPage] = useState(0);
    const { data, setData, post, processing, reset, errors } = useForm({
        rsba: "",
        lastName: "",
        firstName: "",
        middleName: "",
        sex: "M",
        mobile: "",
        civilStatus: "",
    });

    function InsuranceInfo() {
        return (
            <div className="my-8 flex flex-col gap-2 max-w-5xl mx-auto border-2 w-full rounded-2xl p-8">
                <span className="text-2xl font-bold">
                    Purpose of Crop Insurance Application:
                </span>
                <p className="text-xl leading-loose">
                    This application aims to provide financial protection to
                    farmers against losses caused by natural disasters (such as
                    floods, droughts, and pests) or market fluctuations. Crop
                    insurance ensures you can recover from unexpected events and
                    continue farming with confidence.
                </p>
                <p className="text-xl leading-loose">
                    By completing this application, you can:
                </p>
                <ul className="text-xl space-y-2 list-disc list-inside dark:text-gray-400 ms-6">
                    <li>Safeguard your crops and investments.</li>
                    <li>
                        Access compensation for damages caused by unforeseen
                        events.
                    </li>
                    <li>
                        Benefit from government-supported schemes and subsidies
                        (if applicable).
                    </li>
                    <li>
                        Contribute to a more stable and sustainable agricultural
                        community.
                    </li>
                </ul>

                <div className="my-8 w-full flex justify-center">
                    <button
                        onClick={() => setPage(1)}
                        className="bg-emerald-700 border border-black rounded-full px-8 py-2 text-white text-xl"
                    >
                        Proceed Application
                    </button>
                </div>
            </div>
        );
    }

    function PersonalInfo() {
        return (
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
                            Insurance{" "}
                            <span className="hidden sm:inline-flex sm:ms-1">
                                Info
                            </span>
                        </span>
                    </li>
                    <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                            <span className="me-2 size-4 sm:size-6 text-xs sm:text-md flex justify-center items-center rounded-full border border-black">
                                4
                            </span>
                            Farm{" "}
                            <span className="hidden sm:inline-flex sm:ms-1">
                                Info
                            </span>
                        </span>
                    </li>
                    <li className="flex items-center">
                        <span className="me-2 size-4 sm:size-6 text-xs sm:text-md flex justify-center items-center rounded-full border border-black">
                            5
                        </span>
                        Beneficiaries
                    </li>
                </ol>
                <div className="bg-white rounded-2xl mt-2 px-8 lg:px-0">
                    <div className="w-full flex flex-col items-center gap-4 py-2">
                        <span className="text-xl">Personal Info</span>
                        <div className="grid grid-cols-4 gap-4">
                            <div />
                            <div className="flex flex-col gap-2 col-span-2">
                                <label htmlFor="lastName" className="text-center">RSBA No.</label>
                                <input
                                    type="text"
                                    value={data.rsba}
                                    onChange={(e) =>
                                        setData("rsba", e.target.value)
                                    }
                                />
                            </div>
                            <div />
                            <div className="flex flex-col gap-2">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    value={data.lastName}
                                    onChange={(e) =>
                                        setData("lastName", e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    value={data.firstName}
                                    onChange={(e) =>
                                        setData("firstName", e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="middleName">Middle Name</label>
                                <input
                                    type="text"
                                    value={data.middleName}
                                    onChange={(e) =>
                                        setData("middleName", e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="sex">Sex</label>
                                <select
                                    value={data.sex}
                                    onChange={(e) =>
                                        setData("sex", e.target.value)
                                    }
                                >
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </select>
                            </div>
                            <div />
                            <div className="flex flex-col gap-2">
                                <label htmlFor="mobile">Mobile Number</label>
                                <input
                                    type="text"
                                    value={data.mobile}
                                    onChange={(e) =>
                                        setData("mobile", e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="civilStatus">
                                    Civil Status
                                </label>
                                <select
                                    value={data.sex}
                                    onChange={(e) =>
                                        setData("sex", e.target.value)
                                    }
                                >
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </select>
                                <input
                                    type="text"
                                    value={data.civilStatus}
                                    onChange={(e) =>
                                        setData("civilStatus", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <button
                            className="bg-blue-600 px-8 py-1 text-white rounded-full border border-black"
                            onClick={() => setPage(2)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function CropInfo() {
        return (
            <div className="my-8 flex flex-col gap-2 max-w-5xl mx-auto border-2 bg-base-color w-full rounded-2xl pt-8">
                <ol className="flex items-center w-full text-sm font-medium text-center text-neutral-800 sm:text-base px-8">
                    <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                            <span className="me-2 size-4 sm:size-6 text-xs sm:text-md flex justify-center items-center rounded-full border border-black">
                                1
                            </span>
                            Personal{" "}
                            <span className="hidden sm:inline-flex sm:ms-1">
                                Info
                            </span>
                        </span>
                    </li>
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
                            Insurance{" "}
                            <span className="hidden sm:inline-flex sm:ms-1">
                                Info
                            </span>
                        </span>
                    </li>
                    <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-700 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 dark:after:border-gray-700">
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-700 dark:after:text-gray-500">
                            <span className="me-2 size-4 sm:size-6 text-xs sm:text-md flex justify-center items-center rounded-full border border-black">
                                4
                            </span>
                            Farm{" "}
                            <span className="hidden sm:inline-flex sm:ms-1">
                                Info
                            </span>
                        </span>
                    </li>
                    <li className="flex items-center">
                        <span className="me-2 size-4 sm:size-6 text-xs sm:text-md flex justify-center items-center rounded-full border border-black">
                            5
                        </span>
                        Beneficiaries
                    </li>
                </ol>
                <div className="bg-white rounded-2xl mt-2 px-8 lg:px-0">
                    <div className="w-full flex flex-col items-center gap-4 py-2">
                        <span className="text-xl">Crop Information</span>
                        <div className="grid grid-cols-2 gap-4 w-full px-0 lg:px-8">
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <input
                                    type="radio"
                                    value=""
                                    name="bordered-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    for="bordered-radio-1"
                                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Default radio
                                </label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <input
                                    type="radio"
                                    value=""
                                    name="bordered-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    for="bordered-radio-2"
                                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Checked state
                                </label>
                            </div>
                        </div>
                        <button
                            className="bg-blue-600 px-8 py-1 text-white rounded-full border border-black"
                            onClick={() => setPage(2)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title="Apply for Insurance" />

            <FarmerNavbar user={user} />

            <div className="px-6 lg:px-0">
                {page === 0 ? (
                    <InsuranceInfo />
                ) : page === 1 ? (
                    <PersonalInfo />
                ) : page === 2 ? (
                    <CropInfo />
                ) : null}
            </div>
        </>
    );
}

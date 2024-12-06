import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function RejectInsurance(insurance) {
    console.log()
    const { data, setData, patch, processing, reset, errors } = useForm({
        approved: 1,
        scheduleDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        scheduleTime: "08:00",
        userId: insurance.insurance.user_id
    });

    const [showModal, setShowModal] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        patch(route("insurance.update", insurance), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
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
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="2xl"
            >
                <form className="p-8 flex flex-col gap-4" onSubmit={submit}>
                    <span className="text-xl font-bold">Approve Insurance</span>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Interview Schedule Date: </label>
                            <input
                                type="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.scheduleDate}
                                onChange={(e) =>
                                    setData("scheduleDate", e.target.value)
                                }
                                min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                                required
                            />
                            <InputError message={errors.scheduleDate} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Interview Schedule Time: </label>
                            <input
                                type="time"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.scheduleTime}
                                onChange={(e) =>
                                    setData("scheduleTime", e.target.value)
                                }
                                min={"08:00"}
                                required
                            />
                            <InputError message={errors.scheduleTime} />
                        </div>
                    </div>
                    <div className="w-full flex justify-center gap-2">
                        <SecondaryButton
                            onClick={() => {
                                setShowModal(false);
                                reset();
                            }}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
                        >
                            Approve Insurance
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

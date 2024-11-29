import { useState } from "react";
import Modal from "../../Components/Modal";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "../../Components/InputError";
import SecondaryButton from "../../Components/SecondaryButton";
import PrimaryButton from "../../Components/PrimaryButton";

export default function AdminEditResource({ resource }) {
    console.log(resource);
    const [showModal, setShowModal] = useState(false);
    const { data, setData, patch, processing, errors, reset } = useForm({
        name: resource.name,
        type: resource.type,
        quantity: resource.category == 2 ? resource.quantity : resource.stock,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(
            route(
                `${
                    resource.category == 1
                        ? "fertilizers"
                        : resource.category == 2
                        ? "equipments"
                        : "seeds"
                }.update`,
                resource.id
            ),
            {
                onSuccess: () => {
                    reset();
                    setShowModal(false);
                },
            }
        );
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="font-medium flex gap-1 items-center text-blue-500 hover:underline p-2 border-2 border-blue-600 dark:border-blue-500 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 rounded-md"
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
                Edit
            </button>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="2xl"
            >
                <form className="p-8 flex flex-col gap-4" onSubmit={submit}>
                    <span className="text-xl font-bold">Edit Resource</span>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">
                                {resource.category == 1
                                    ? "Fertilizer"
                                    : resource.category == 2
                                    ? "Equipment"
                                    : "Seed"}{" "}
                                Name:{" "}
                            </label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder=" "
                            />
                            <InputError message={errors.name} />
                        </div>
                        {resource.category == 1 && (
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name">Fertilizer Type: </label>
                                <select
                                    value={data.type}
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                >
                                    <option value="organic">Organic</option>
                                    <option value="inorganic">Inorganic</option>
                                </select>
                                <InputError message={errors.type} />
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Quantity: </label>
                            <input
                                type="number"
                                value={data.quantity}
                                onChange={(e) =>
                                    setData("quantity", e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=" "
                            />
                            <InputError message={errors.quantity} />
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
                            className="bg-green-600 hover:bg-green-700 active:bg-green-800"
                        >
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

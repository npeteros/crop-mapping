import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AdminEditCropType({ cropType }) {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: cropType.name,
        color: cropType.color,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("crop-types.update", cropType.id), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    return (
        <>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="2xl"
            >
                <form className="p-8 flex flex-col gap-4" onSubmit={submit}>
                    <span className="text-xl font-bold">Edit Crop Type</span>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Name: </label>
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
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Color: </label>
                            <input
                                type="color"
                                value={data.color}
                                onChange={(e) =>
                                    setData("color", e.target.value)
                                }
                            />
                            <InputError message={errors.color} />
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
            <span
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                Edit
            </span>
        </>
    );
}

import { useState } from "react";
import Modal from "../../Components/Modal";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "../../Components/InputError";
import SecondaryButton from "../../Components/SecondaryButton";
import PrimaryButton from "../../Components/PrimaryButton";

export default function UserEditCrop({ crop }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, patch, processing, errors, reset } = useForm({
        planting_date: crop.planting_date,
        harvest_date: crop.harvest_date,
        land_area: crop.land_area,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("crops.update", crop.id), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            }
            });
    };

    return (
        <>
            <span
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                Edit
            </span>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="2xl"
            >
                <form className="p-8 flex flex-col gap-4" onSubmit={submit}>
                    <span className="text-xl font-bold">Edit Crop</span>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Planting Date: </label>
                            <input
                                type="date"
                                value={data.planting_date}
                                autoComplete="date"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("planting_date", e.target.value)
                                }
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                            />
                            <InputError message={errors.planting_date} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Harvest Date: </label>
                            <input
                                type="date"
                                value={data.harvest_date}
                                autoComplete="date"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("harvest_date", e.target.value)
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

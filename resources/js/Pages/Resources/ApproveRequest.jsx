import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function ApproveRequest(request) {
    console.log(request);
    const { data, setData, patch, processing, reset, errors } = useForm({
        approved: 1,
        deliveryDate: new Date(Date.now() + 86400000)
            .toISOString()
            .split("T")[0],
    });

    const [showModal, setShowModal] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        patch(route("resource-requests.update", request.request.id), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
                Approve
            </button>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="2xl"
            >
                <form className="p-8 flex flex-col gap-4" onSubmit={submit}>
                    <span className="text-xl font-bold">Approve Resource</span>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Delivery Date: </label>
                            <input
                                type="date"
                                value={data.deliveryDate}
                                onChange={(e) =>
                                    setData("deliveryDate", e.target.value)
                                }
                                min={data.deliveryDate}
                            />
                        </div>
                        <InputError message={errors.deliveryDate} />
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
                            Approve Request
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

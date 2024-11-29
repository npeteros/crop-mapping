import { useState } from "react";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";

export default function AddModal({
    title,
    onSubmit,
    processing,
    children,
    submitText = "Submit",
    triggerText = "Add",
}) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button
                className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-12 py-2 rounded-lg"
                onClick={() => setShowModal(true)}
            >
                {triggerText}
            </button>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="2xl"
            >
                <form className="p-8 flex flex-col gap-4" onSubmit={onSubmit}>
                    <span className="text-xl font-bold">{title}</span>
                    <div className="flex flex-col gap-4">{children}</div>
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
                            {submitText}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

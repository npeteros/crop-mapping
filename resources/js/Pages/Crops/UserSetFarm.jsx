import { useEffect, useState } from "react";
import Modal from "../../Components/Modal";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "../../Components/InputError";
import SecondaryButton from "../../Components/SecondaryButton";
import PrimaryButton from "../../Components/PrimaryButton";

export default function UserSetFarms({ cropId, farm }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        farmId: farm ? farm.id : null,
    });

    useEffect(() => {
        setData("farmId", farm ? farm.id : null);
    }, [farm]);

    const submit = (e) => {
        e.preventDefault();
        patch(route("crops.update", cropId), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <button
                className={`${
                    farm == null ? "bg-neutral-400" : "bg-secondary-dark"
                } text-white rounded-md py-2 w-full`}
                disabled={farm == null}
            >
                Select this Farm
            </button>
        </form>
    );
}

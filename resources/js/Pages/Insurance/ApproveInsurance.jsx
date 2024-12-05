import { Link, useForm } from "@inertiajs/react";

export default function ApproveInsurance(insurance) {
    const { data, setData, patch, processing, reset, errors } = useForm({
        approved: 1,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("insurance.update", insurance), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <button type="submit" className="font-medium flex gap-1 items-center text-emerald-500 hover:underline p-2 border-2 border-emerald-600 dark:border-emerald-500 hover:text-white hover:bg-emerald-600 dark:hover:bg-emerald-500 rounded-md">
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
        </form>
    );
}

import { useForm } from "@inertiajs/react";

export default function DeleteAccount({ userId }) {
    const { data, setData, delete:destroy, processing, errors } = useForm({
        userId: userId,
    });

    const submit = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'));
    };

    return (
        <form onSubmit={submit}>
            <button type="submit" className="font-medium text-red-600 dark:text-red-500 hover:underline">
                Delete
            </button>
        </form>
    )
}
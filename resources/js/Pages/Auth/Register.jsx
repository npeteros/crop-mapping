import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        rsba: "",
        birthdate: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout title="Sign Up">
            <Head title="Sign Up" />

            <form onSubmit={submit}>
                <div className="relative z-0 mt-4">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                        Email Address
                    </label>
                </div>
                <InputError message={errors.email} className="mt-2" />

                <div className="relative z-0 mt-4">
                    <input
                        id="rsba"
                        type="text"
                        name="rsba"
                        value={data.rsba}
                        autoComplete="rsba"
                        isFocused={true}
                        onChange={(e) => setData("rsba", e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="rsba"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                        RSBA Number
                    </label>
                </div>
                <InputError message={errors.rsba} className="mt-2" />

                <div className="relative z-0 mt-6">
                    <input
                        id="birthdate"
                        type="date"
                        name="birthdate"
                        value={data.birthdate}
                        autoComplete="date"
                        isFocused={true}
                        onChange={(e) => setData("birthdate", e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="birthdate"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                        Birthdate
                    </label>
                </div>
                <InputError message={errors.birthdate} className="mt-2" />

                <div className="mt-6 flex flex-col items-center justify-center gap-2">
                    <PrimaryButton className="ms-4 bg-secondary-light hover:bg-secondary-dark active:bg-secondary-dark focus:bg-secondary-dark focus:ring-secondary-light" disabled={processing}>
                        Register
                    </PrimaryButton>
                    
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href={route("login")}
                            className="text-blue-500"
                        >
                            Sign in here
                        </Link>
                    </span>
                </div>
            </form>
        </GuestLayout>
    );
}

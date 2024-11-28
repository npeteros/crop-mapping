import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ title='Log In', children }) {
    return (
        <main className="w-full h-screen grid grid-cols-2">
            <div className="w-full h-full flex items-center justify-center">
                <div className="bg-neutral-100 flex flex-col gap-4 w-[32rem] p-8 rounded-2xl">
                    <div className="w-full flex justify-between">
                        <div className="flex flex-col gap-2">
                            <span className="text-2xl font-bold">
                                Balamban Municipal Agriculture Office
                            </span>
                            <span className="uppercase text-lg">
                                {title}
                            </span>
                        </div>
                        <ApplicationLogo className="size-24" />
                    </div>
                    {children}
                </div>
            </div>
            <div className="bg-base-color flex justify-center items-center">
                <ApplicationLogo className="size-96" />
            </div>
        </main>
    );
}

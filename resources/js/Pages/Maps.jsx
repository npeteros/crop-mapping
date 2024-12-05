import FarmerNavbar from "@/Components/FarmerNavbar";
import Map from "@/Components/Map";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Maps({ barangays, farms }) {
    const user = usePage().props.auth.user;
    return user.role === "bmao" ? (
        <AuthenticatedLayout>
            <Head title="Maps" />
            <Map barangays={barangays} farms={farms} />
        </AuthenticatedLayout>
    ) : (
        <>
            <Head title="Maps" />
            <FarmerNavbar user={user} />

            <Map barangays={barangays} farms={farms} />
        </>
    );
}

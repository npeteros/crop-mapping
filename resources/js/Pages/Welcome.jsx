import Carousel from "@/Components/Carousel";
import FarmerNavbar from "@/Components/FarmerNavbar";
import { Head } from "@inertiajs/react";

export default function Welcome({ auth }) {
    const images = [
        "/img/farmer-3.png",
        "/img/farmer-2.png",
        "/img/farmer-3.png",
        "/img/farmer-4.png",
        "/img/farmer-5.png",
    ];
    return (
        <>
            <Head title="Welcome" />

            <FarmerNavbar user={auth.user} />

            <div className="my-8 flex flex-col gap-2 max-w-7xl mx-auto">
                <Carousel images={images} />
            </div>
        </>
    );
}

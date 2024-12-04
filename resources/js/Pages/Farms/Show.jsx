import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    MapContainer,
    Popup,
    TileLayer,
    GeoJSON,
    useMap,
    useMapEvents,
    Polygon,
    Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Head, useForm } from "@inertiajs/react";
import geoData from "@/Pages/geoData.json";
import { useEffect, useState } from "react";

export default function Farms({ farm }) {
    console.log(farm)
    const [center, setCenter] = useState({
        areaName: "",
        coords: [],
    });
    const [drawing, setDrawing] = useState(false);
    const [user, setUser] = useState(farm.user ? farm.user : farm.precreated_user);
    const { data, setData, post, processing, reset, errors } = useForm({
        color: "#000000",
        coords: [],
        userId: user.id,
    });
    const [drawnZones, setDrawnZones] = useState([]);

    function calculateCenter(coords) {
        let totalLat = 0;
        let totalLng = 0;
        let totalCount = 0;

        coords.forEach(([lat, lng]) => {
            totalLat += lat;
            totalLng += lng;
            totalCount++;
        });

        const centerLat = totalLat / totalCount;
        const centerLng = totalLng / totalCount;

        return [centerLng, centerLat];
    }

    function MapClickHandler() {
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                if (drawing) {
                    setDrawnZones((prev) => [...prev, [lat, lng]]);
                }
            },
        });
    }

    function MoveMapToCenter({ center }) {
        const map = useMap();
        if (center.length > 0 && !drawing) {
            useEffect(() => {
                center && map.setView(center, 20);
            }, [center]);
        }

        return null;
    }
    useEffect(() => {
        const calculatedCenter = calculateCenter(
            farm.zones.map((zone) => [zone.longitude, zone.latitude])
        );
        setCenter({
            areaName: `${user.last_name}, ${user.first_name} ${
                user.middle_name ?? ""
            }`,
            coords: calculatedCenter,
        });
    }, []);

    // function addNewFarm() {
    //     if (data.coords.length > 2) {
    //         post(route("farms.store"), { onSuccess: () => reset() });
    //     }
    // }

    return (
        <AuthenticatedLayout>
            <Head title="Show Farm" />
            <div className="w-screen h-screen relative">
                <MapContainer
                    center={[10.4858, 123.7741]}
                    zoom={12}
                    className="h-full w-full"
                >
                    <TileLayer
                        url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='&copy; <a href="https://www.esri.com">Esri</a> &mdash; Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
                    />
                    {center.coords.length > 0 && (
                        <>
                            <Popup position={center.coords} keepInView={true}>
                                {center.areaName}
                            </Popup>
                        </>
                    )}

                    <GeoJSON data={geoData} />
                    <Polygon
                        key={farm.id}
                        positions={farm.zones.map((zone) => [
                            zone.latitude,
                            zone.longitude,
                        ])}
                        pathOptions={{ color: farm.color }}
                        fill={true}
                        fillColor={farm.color}
                    />
                    <MoveMapToCenter center={center.coords} />
                    <MapClickHandler />

                    {data.coords.length > 2 && (
                        <Polygon
                            positions={data.coords}
                            pathOptions={{ color: data.color }}
                            fill={true}
                            fillColor={data.color}
                        />
                    )}
                    {drawnZones.length > 1 && (
                        <Polyline
                            positions={drawnZones}
                            pathOptions={{ color: "blue", dashArray: "5,5" }}
                        />
                    )}
                </MapContainer>
                <div className="absolute top-4 right-4 z-[1000]">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">

                            <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-white uppercase bg-primary-light dark:bg-primary-light ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Owner's Info
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            RSBA Number
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.rsba}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            Name
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.last_name},{" "}
                                            {user.first_name}{" "}
                                            {user.middle_name ?? undefined}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            Barangay
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.barangay.name}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            Purok/Sitio
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.address}
                                        </td>
                                    </tr>
                                    {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Total Hectares
                                            </th>
                                            <td className="px-6 py-4">{calculateArea(clickedFarm.polygon)}</td>
                                        </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

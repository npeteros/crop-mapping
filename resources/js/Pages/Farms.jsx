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
import InputError from "@/Components/InputError";
import { polygon } from '@turf/helpers';
import area from '@turf/area';

export default function Crops({ barangays, farmers, farms }) {
    const [clickedArea, setClickedArea] = useState({
        areaName: "",
        coords: [],
        total_farmers: 0,
    });
    const [clickedFarm, setClickedFarm] = useState({
        farmer: {},
        coords: [],
    });
    const [center, setCenter] = useState({
        areaName: "",
        coords: [],
    });
    const [drawing, setDrawing] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        color: "#000000",
        coords: [],
        name: "",
        address: "",
        birthdate: "",
        barangay_id: -1,
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

    const calculateArea = (coordinates) => {
        const turfPolygon = polygon([coordinates]);
    
        return area(turfPolygon);
    };
    
    function MoveMapToCenter({ center }) {
        const map = useMap();
        if (center.length > 0 && !drawing) {
            useEffect(() => {
                center && map.setView(center, 14);
            }, [center]);
        }

        return null;
    }

    function MapClickHandler() {
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                if (drawing) {
                    setDrawnZones((prev) => [...prev, [lat, lng]]);
                }

                farms.map((farm) => {
                    const polygon = L.polygon(
                        farm.zones.map((zone) => [
                            zone.latitude,
                            zone.longitude,
                        ])
                    );

                    const isInside = polygon
                        .getBounds()
                        .contains(L.latLng(lat, lng));

                    if (isInside) {
                        setClickedFarm({
                            farmer: farm.user,
                            coords: [lat, lng],
                        });
                    }
                });
            },
        });
        return null;
    }

    function onEachFeature(feature, layer) {
        layer.on("click", (e) => {
            if (feature.properties && feature.properties.NAME_3 && !drawing) {
                const clickedBarangay = barangays.find(
                    (barangay) => barangay.name === feature.properties.NAME_3
                );
                if (clickedBarangay) {
                    const { lat, lng } = e.latlng;
                    setClickedArea({
                        coords: [lat, lng],
                        areaName: feature.properties.NAME_3,
                        total_farmers: clickedBarangay.users_count,
                    });
                }
            }
        });
    }

    function handleFocusArea(name) {
        const feature = geoData.features.find(
            (f) => f.properties.NAME_3 === name
        );
        if (feature && feature.geometry.coordinates) {
            const calculatedCenter = calculateCenter(
                feature.geometry.coordinates[0]
            );
            setCenter({ areaName: name, coords: calculatedCenter });
            const { id } = barangays.find((barangay) => barangay.name === name);
            setData("barangay_id", id);
        }
    }

    function addNewCrop() {
        if (data.coords.length > 2) {
            post(route("farms.store"), { onSuccess: () => reset() });
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Maps" />
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
                            <Popup position={center.coords}>
                                {center.areaName}
                            </Popup>
                        </>
                    )}
                    {clickedArea.coords.length > 0 && !drawing && (
                        <Popup position={clickedArea.coords}>
                            <span className="font-bold">
                                {clickedArea.areaName}
                            </span>
                            <br />
                            <span>
                                Total Farmers: {clickedArea.total_farmers}
                            </span>
                        </Popup>
                    )}
                    <GeoJSON
                        data={geoData}
                        // onEachFeature={onEachFeature}
                    />
                    <MoveMapToCenter center={center.coords} />
                    <MapClickHandler />
                    {clickedFarm.coords.length > 0 && !drawing && (
                        <Popup position={clickedFarm.coords}>
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Owner's Info
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Name
                                            </th>
                                            <td class="px-6 py-4">{clickedFarm.farmer.name}</td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Address
                                            </th>
                                            <td class="px-6 py-4">{clickedFarm.farmer.address}</td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Birthdate
                                            </th>
                                            <td class="px-6 py-4">{clickedFarm.farmer.birthdate}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Popup>
                    )}
                    {farms.map((farm) => {
                        return (
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
                        );
                    })}
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
                            <div className="flex gap-2 items-center justify-center text-primary-dark">
                                <svg
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M14.71 14h.79l4.99 5L19 20.49l-5-4.99v-.79l-.27-.28A6.471 6.471 0 0 1 9.5 16 6.5 6.5 0 1 1 16 9.5c0 1.61-.59 3.09-1.57 4.23l.28.27ZM5 9.5C5 11.99 7.01 14 9.5 14S14 11.99 14 9.5 11.99 5 9.5 5 5 7.01 5 9.5Z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span>Search</span>
                            </div>
                            <div className="w-full">
                                <select
                                    onChange={(e) =>
                                        handleFocusArea(e.target.value)
                                    }
                                    defaultValue="def"
                                >
                                    <option value="def" disabled>
                                        Select Barangay
                                    </option>
                                    {barangays.map((barangay) => (
                                        <option
                                            key={barangay.id}
                                            value={barangay.name}
                                        >
                                            {barangay.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {center.coords.length > 0 && (
                            <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
                                <div className="flex gap-2 items-center justify-center text-primary-dark">
                                    <svg
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 15v-6h2v6h-2Zm0-10v2h2V7h-2Z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span>New Farmer</span>
                                </div>

                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <label
                                            htmlFor="color"
                                            className="font-medium"
                                        >
                                            Choose Farm Color:{" "}
                                        </label>
                                        <input
                                            type="color"
                                            onChange={(e) =>
                                                setData("color", e.target.value)
                                            }
                                            value={data.color}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="name"
                                            className="font-medium"
                                        >
                                            Name:{" "}
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="address"
                                            className="font-medium"
                                        >
                                            Address:{" "}
                                        </label>
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="birthdate"
                                            className="font-medium"
                                        >
                                            Birthdate:{" "}
                                        </label>
                                        <input
                                            type="date"
                                            value={data.birthdate}
                                            onChange={(e) =>
                                                setData(
                                                    "birthdate",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                            max={
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 mb-4">
                                        <button
                                            className="bg-secondary-dark text-white rounded-md py-2 w-full"
                                            onClick={() => {
                                                if (
                                                    drawing &&
                                                    drawnZones.length > 2
                                                ) {
                                                    setData(
                                                        "coords",
                                                        drawnZones
                                                    );
                                                }
                                                setDrawing(!drawing);
                                                setDrawnZones([]);
                                            }}
                                        >
                                            {!drawing ? "Draw Farm" : "Finish"}
                                        </button>
                                        <button
                                            className={`${
                                                !drawing
                                                    ? "bg-neutral-400"
                                                    : "bg-secondary-light"
                                            } text-white rounded-md py-2 w-full`}
                                            onClick={() => setDrawnZones([])}
                                            disabled={!drawing}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                    <InputError
                                        message={errors.barangay_id}
                                        className="mt-2"
                                    />
                                    <InputError
                                        message={errors.color}
                                        className="mt-2"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                    <InputError
                                        message={errors.address}
                                        className="mt-2"
                                    />
                                    <InputError
                                        message={errors.birthdate}
                                        className="mt-2"
                                    />
                                    <InputError
                                        message={errors.coords}
                                        className="mt-2"
                                    />
                                    <button
                                        className={`w-full ${
                                            processing ||
                                            drawing ||
                                            data.coords.length < 3
                                                ? "bg-neutral-400"
                                                : "bg-primary-light"
                                        } text-white rounded-md py-2`}
                                        disabled={
                                            processing ||
                                            drawing ||
                                            data.coords.length < 3
                                        }
                                        onClick={addNewCrop}
                                    >
                                        Add Crop
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

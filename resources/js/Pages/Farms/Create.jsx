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
import { polygon } from "@turf/helpers";
import area from "@turf/area";

export default function Create({ user }) {
    console.log(user)
    const [center, setCenter] = useState({
        areaName: "",
        coords: [],
    });
    const [drawing, setDrawing] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        color: "#000000",
        coords: [],
        rsba: user.rsba
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
                center && map.setView(center, 14);
            }, [center]);
        }

        return null;
    }
    useEffect(() => {
        const feature = geoData.features.find(
            (f) => f.properties.NAME_3 === user.barangay.name
        );
        if (feature && feature.geometry.coordinates) {
            const calculatedCenter = calculateCenter(
                feature.geometry.coordinates[0]
            );
            setCenter({
                areaName: user.barangay.name,
                coords: calculatedCenter,
            });
        }
    }, []);

    function addNewFarm() {
        if (data.coords.length > 2) {
            post(route("farms.store"), { onSuccess: () => reset() });
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Add Farm" />
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
                                <InputError
                                    message={errors.color}
                                    className="mt-2"
                                />

                                <div className="flex flex-col gap-2 mb-4">
                                    <button
                                        className="bg-secondary-dark text-white rounded-md py-2 w-full"
                                        onClick={() => {
                                            if (
                                                drawing &&
                                                drawnZones.length > 2
                                            ) {
                                                setData("coords", drawnZones);
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
                                    message={errors.userId}
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
                                    onClick={addNewFarm}
                                >
                                    Add Crop
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

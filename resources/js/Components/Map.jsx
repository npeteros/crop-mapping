import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    Popup,
    TileLayer,
    GeoJSON,
    useMap,
    Polygon,
    useMapEvents,
} from "react-leaflet";
import geoData from "@/Pages/geoData.json";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Map({ barangays, farms }) {
    const user = usePage().props.auth.user;

    const [clickedArea, setClickedArea] = useState({
        areaName: "",
        coords: [],
        total_farmers: 0,
    });
    const [center, setCenter] = useState({
        areaName: "",
        coords: [],
    });
    const [clickedFarm, setClickedFarm] = useState({
        farmer: {},
        polygon: [],
        coords: [],
    });

    function getCropTypeNamesForUser(user) {
        if (!user || !user.crops) {
            return ""; // Return an empty string if the user object or "crops" key is missing
        }

        return Array.from(
            new Set(
                user.role === "bmao"
                    ? farms.flatMap(
                          (farm) =>
                              farm.user?.crops?.map(
                                  (crop) => crop.crop_type.name
                              ) || []
                      )
                    : user.crops.map((crop) => crop.crop_type.name)
            )
        ).join(", ");
    }

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

    const calculateArea = (coords) => {
        // const poly = polygon([setCoords.map(([lng, lat]) => [lng, lat])])
        // return area(poly);
    };

    function MoveMapToCenter({ center }) {
        const map = useMap();
        if (center.length > 0) {
            useEffect(() => {
                center && map.setView(center, 14);
            }, [center, map]);
        }

        return null;
    }

    function MapClickHandler() {
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;

                if (user.role === "bmao") {
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
                                farmer: farm.user ?? farm.precreated_user,
                                coords: [lat, lng],
                                polygon: farm.zones.map((zone) => [
                                    zone.latitude,
                                    zone.longitude,
                                ]),
                            });
                        }
                    });
                } else {
                    const polygon = L.polygon(
                        farms.zones.map((zone) => [
                            zone.latitude,
                            zone.longitude,
                        ])
                    );

                    const isInside = polygon
                        .getBounds()
                        .contains(L.latLng(lat, lng));

                    if (isInside) {
                        setClickedFarm({
                            farmer: farms.user ?? farms.precreated_user,
                            coords: [lat, lng],
                            polygon: farms.zones.map((zone) => [
                                zone.latitude,
                                zone.longitude,
                            ]),
                        });
                    }
                }
            },
        });
        return null;
    }

    function onEachFeature(feature, layer) {
        layer.on("click", (e) => {
            if (feature.properties && feature.properties.NAME_3) {
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
        }
    }
    return (
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
                {clickedArea.coords.length > 0 && (
                    <Popup position={clickedArea.coords}>
                        <span className="font-bold">
                            {clickedArea.areaName}
                        </span>
                        <br />
                        <span>Total Farmers: {clickedArea.total_farmers}</span>
                    </Popup>
                )}
                {farms &&
                    (user.role === "farmer" ? (
                        <Polygon
                            key={farms.id}
                            positions={farms.zones.map((zone) => [
                                zone.latitude,
                                zone.longitude,
                            ])}
                            pathOptions={{ color: farms.color }}
                            fill={true}
                            fillColor={farms.color}
                        />
                    ) : (
                        farms.map((farm) => (
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
                        ))
                    ))}
                <GeoJSON data={geoData} onEachFeature={onEachFeature} />
                <MoveMapToCenter center={center.coords} />
                <MapClickHandler />
                {clickedFarm.coords.length > 0 && (
                    <Popup position={clickedFarm.coords}>
                        <div className="relative overflow-x-auto">
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
                                            {clickedFarm.farmer.rsba}
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
                                            {clickedFarm.farmer.last_name},{" "}
                                            {clickedFarm.farmer.first_name}{" "}
                                            {clickedFarm.farmer.middle_name ??
                                                undefined}
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
                                            {clickedFarm.farmer.barangay.name}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            Address
                                        </th>
                                        <td className="px-6 py-4">
                                            {clickedFarm.farmer.address}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            Crops
                                        </th>
                                        <td className="px-6 py-4">
                                            {getCropTypeNamesForUser(
                                                clickedFarm.farmer
                                            )}
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
                    </Popup>
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
                </div>
            </div>
        </div>
    );
}

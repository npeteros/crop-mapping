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
import FarmerNavbar from "@/Components/FarmerNavbar";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import UserSetFarms from "./UserSetFarm";

export default function Maps({ farms, storeData }) {
    const user = usePage().props.auth.user;

    const [clickedFarm, setClickedFarm] = useState({
        farm: null,
    });

    const { data, setData, post, processing, errors } = useForm({
        farm_id: clickedFarm.farm?.id,
        user_id: storeData.user_id,
        crop_type_id: storeData.crop_type_id,
        planting_date: storeData.planting_date,
        harvest_date: storeData.harvest_date,
        land_area: storeData.land_area,
    });

    function MapClickHandler() {
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;

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
                            farm: farm,
                        });
                        setData("farm_id", farm.id);
                    }
                });
            },
        });
        return null;
    }

    const submit = (e) => {
        e.preventDefault();

        post(route("crops.store"));
    }
    return (
        <>
            <Head title="Maps" />
            <FarmerNavbar user={user} />

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
                    {farms &&
                        farms.map((farm) => (
                            <Polygon
                                key={farm.id}
                                positions={farm.zones.map((zone) => [
                                    zone.latitude,
                                    zone.longitude,
                                ])}
                                pathOptions={{
                                    color:
                                        clickedFarm.farm &&
                                        clickedFarm.farm.id == farm.id
                                            ? "red"
                                            : farm.color,
                                }}
                                fill={true}
                                fillColor={
                                    clickedFarm.farm &&
                                    clickedFarm.farm.id == farm.id
                                        ? "red"
                                        : farm.color
                                }
                            />
                        ))}
                    <GeoJSON data={geoData} />
                    <MapClickHandler />
                </MapContainer>
                <div className="absolute top-4 right-4 z-[1000]">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
                            <div className="w-full flex flex-col gap-4 justify-center px-4">
                                <span className="font-medium">
                                    Choose a farm to place the crop
                                </span>
                                <form onSubmit={submit}>
                                    <button
                                        className={`${
                                            clickedFarm.farm == null
                                                ? "bg-neutral-400"
                                                : "bg-secondary-dark"
                                        } text-white rounded-md py-2 w-full`}
                                        disabled={clickedFarm.farm == null}
                                    >
                                        Select this Farm
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

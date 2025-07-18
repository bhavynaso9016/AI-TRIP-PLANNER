import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {

    const [photoUrl, setPhotoUrl] = useState();


    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label,
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name);

            const PhotoUrl = PHOTO_REF_URL.replace(
                "{NAME}",
                resp.data.places[0].photos[1].name)

            setPhotoUrl(PhotoUrl);
        })
    }

    return (
        <Link to={"/view-trip/" + trip?.id}>
            <div className="hover:scale-105 transition-all hover:shadow-md">
                <img
                    className="object-cover rounded-xl mx-auto w-80 h-[220px]"
                    src={photoUrl ? photoUrl : '/place.jpeg'}
                />
                <h2 className="font-bold text-lg">
                    {trip?.userSelection?.location?.label}
                </h2>
                <h2 className="text-sm text-gray-500">
                    {trip?.userSelection?.noOfDays} days trip with "
                    {trip?.userSelection?.budget}" budget.
                </h2>
                <br />
                <br />0
            </div>
        </Link>
    );
};

export default UserTripCardItem;
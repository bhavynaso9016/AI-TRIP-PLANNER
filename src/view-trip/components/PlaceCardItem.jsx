
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";



function PlaceCardItem({ place }) {

    const [photoUrl, setPhotoUrl] = useState();


    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place.placeName,
        }
        const result = await GetPlaceDetails(data).then(resp => {
            // console.log(resp.data)
            console.log(resp.data.places[0].photos[3].name);

            const PhotoUrl = PHOTO_REF_URL.replace(
                "{NAME}",
                resp.data.places[0].photos[3].name)
            // console.log(PhotoUrl)

            setPhotoUrl(PhotoUrl);
        })
    }


    return (

        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
            <div className=' border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img src={photoUrl ? photoUrl : '/place.jpeg'} className='w-[130px] h-[130px] rounded-xl object-cover' />
                <div>
                    <h2 className='font-bold  text-left text-lg'>{place.placeName}</h2>
                    <p className='text-left text-sm text-gray-500'>{place.placeDetails}</p>
                    <br />
                    <h2 className='text-left mt-2'>🕙:{place.timeToTravel}</h2>
                    <h2 className='text-left mt-2'>🎟️:{place.ticketPricing}</h2>

                    {/* <Button size="sm"><FaMapLocationDot /></Button> */}
                </div>

            </div>
        </Link >
    )
}

export default PlaceCardItem

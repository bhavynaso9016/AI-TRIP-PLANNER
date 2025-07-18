import { Link } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from '@/service/GlobalApi';



function HotelCardItem({ hotel }) {

    const [photoUrl, setPhotoUrl] = useState();


    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName,
        }
        const result = await GetPlaceDetails(data).then(resp => {
            // console.log(resp.data)
            console.log(resp.data.places[0].photos[1].name);

            const PhotoUrl = PHOTO_REF_URL.replace(
                "{NAME}",
                resp.data.places[0].photos[4].name)
            // console.log(PhotoUrl)

            setPhotoUrl(PhotoUrl);
        })
    }



    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel.hotelAddress} target='_blank'>
            <div className='border rounded-xl  hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl ? photoUrl : '/place.jpeg'} alt={`${hotel?.hotelName}`} className=" w-full rounded-xl h-[180px]  object-cover" />
                <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-semibold text-bold">{hotel?.hotelName}</h2>
                    <h2 className="text-xs text-gray-500">📍{hotel?.hotelAddress}</h2>
                    <p className="text-sm text-gray-700  mt-1"><span className="font-bold">Description:</span> {hotel.description}</p>
                    <h2 className=' text-sm'><span className="font-bold">💰Price:</span> {hotel?.price} </h2>
                    <h2 className='text-sm'> <span className="font-bold">⭐Rating:</span> {hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem;

import React from 'react';
import HotelCardItem from './HotelCardItem';
function Hotels({ trip }) {
    return (


        
        <div>
            <h2 className="font-bold text-xl mt-5">Hotel Recommendation :</h2>
            <br />
            <br />
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <HotelCardItem hotel={hotel} />

                ))}
            </div>
            <br />
            <br />
        </div>
    );
}

export default Hotels;

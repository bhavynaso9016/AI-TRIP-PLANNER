import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    return (
        <div className='font-left'>
            <h2 className='font-bold text-lg'>Places To Visit :</h2>
            <div>
                {Object.entries(trip.tripData?.itinerary || {}).map(([dayKey, dayData], index) => (
                    <div key={index} className='mt-5'>
                        <h2 className='font-medium text-lg'>Day {index + 1}</h2>
                        <h2 className='font-medium text-lg'>Best Time: {dayData.bestTimeToVisit}</h2>
                        <br />
                        <div className='grid md:grid-cols-2 gap-5'>
                            {dayData.plan.map((place, idx) => (
                                <div key={idx}>
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                        <br /><br />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;

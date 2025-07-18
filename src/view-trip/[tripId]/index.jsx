import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";



function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    const GetTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);
        {
            if (docSnap.exists()) {
                console.log("Document : ", docSnap.data());
                setTrip(docSnap.data());
            } else {
                console.log("No such document");
                toast("No trip found");
            }
        }
    };
    useEffect(() => {
        tripId && GetTripData();
    }, [tripId]);

    return (
        <div className="w-full min-h-screen">
            {/* Information Section */}
            <InfoSection trip={trip} />

            {/* Recommended Hotels */}
                <Hotels trip={trip} />

            {/* Daily Plan */}
            <PlacesToVisit trip={trip} />

            {/* Footer (not necessary) */}

            <Footer trip ={trip}/>
        </div>
    );
};


export default Viewtrip

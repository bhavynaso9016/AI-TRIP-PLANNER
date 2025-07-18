import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/option";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { chatSession } from "@/service/AIModel";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
    const [place, setPlace] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        console.log("Form Data:", formData);
    }, [formData]);

    const saveAiTrip = async (tripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            toast.error("User not authenticated. Please sign in.");
            setOpenDialog(true);
            setLoading(false);
            return;
        }

        const docId = Date.now().toString();
        try {
            await setDoc(doc(db, "AITrips", docId), {
                userSelection: formData,
                tripData: JSON.parse(tripData),
                userEmail: user.email,
                id: docId,
                createdAt: new Date().toISOString(),
            });
            toast.success("Trip saved successfully!");
            navigate(`/view-trip/${docId}`);
        } catch (error) {
            console.error("Error saving trip:", error);
            toast.error("Failed to save trip. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const generateTrip = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.traveler) {
            toast.error("Please fill all the details before generating a trip.");
            return;
        }

        try {
            setLoading(true);
            const finalPrompt = AI_PROMPT
                .replace("{location}", formData.location.label)
                .replace("{totalDays}", formData.noOfDays)
                .replace("{traveler}", formData.traveler)
                .replace("{budget}", formData.budget);

            const result = await chatSession.sendMessage(finalPrompt);
            const tripData = await result?.response?.text();
            console.log("Generated Trip Data:", tripData);
            await saveAiTrip(tripData);
        } catch (error) {
            console.error("Error generating trip:", error.message);
            toast.error("Failed to generate trip. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const login = useGoogleLogin({
        onSuccess: (response) => getUserProfile(response),
        onError: (error) => console.error("Login Failed:", error),
    });


    const getUserProfile = async (tokenInfo) => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenInfo.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenInfo.access_token}`,
                        Accept: "application/json",
                    },
                }
            );
            console.log("User Info:", response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            window.dispatchEvent(new Event("storage"));  

            setOpenDialog(false);
            generateTrip();
        } catch (error) {
            console.error("Error fetching user profile:", error.message);
            toast.error("Failed to fetch user profile. Please try again.");
        }
    };

    return (
        <div className="sm:px-20 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences 🚢✈️⛱️</h2>
            <p className="mt-3 text-gray-500 text-xl">Help us understand your travel plans by providing some details below.</p>
            <div className="mt-20 flex flex-col gap-9">
                <div>
                    <h2 className="text-xl font-medium my-3">What is your destination?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setPlace(v);
                                handleInputChange("location", v);
                            },
                        }}
                    />
                </div>

                <div>
                    <h2 className="text-xl font-medium my-3">How many days are you planning your trip?</h2>
                    <Input
                        placeholder="Ex. 3"
                        type="number"
                        onChange={(e) => handleInputChange("noOfDays", e.target.value)}
                    />
                </div>

                <div>
                    <h2 className="text-xl font-medium my-3">What is your budget?</h2>
                    <div className="grid grid-cols-3 gap-3 mt-5">
                        {SelectBudgetOptions.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleInputChange("budget", item.title)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget === item.title ? "shadow-lg border-black" : ""}`}
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-medium my-3">
                        Who do you plan on traveling with on your next adventure?
                    </h2>
                    <div className="grid grid-cols-3 gap-3 mt-5">
                        {SelectTravelList.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleInputChange("traveler", item.people)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler === item.people ? "shadow-lg border-black" : ""}`}>
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                                <h2 className="text-sm text-gray-500">{item.people}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="my-10 justify-end flex">
                <Button disabled={loading} onClick={generateTrip}>
                    {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : "Generate Trip"}
                </Button>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo.svg" alt="Logo" />
                            <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
                            <p>Sign in to the app with Google authentication securely</p>
                            <Button onClick={login} className="w-full mt-5 flex gap items-center">
                            <FcGoogle className="w-7 h-7" /> Sign in with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>

    );
}

export default CreateTrip;

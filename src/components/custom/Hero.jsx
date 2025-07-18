import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

// Import Swiper styles and components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Slider Images
const sliderImages = [
    'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/AI_Tools_Plan_Summer_Trip.width-1200.format-webp.webp',
    'https://blog.solguruz.com/wp-content/uploads/2024/05/How-to-Build-an-AI-powered-Trip-Planner-App.png',
    'https://images.moneycontrol.com/static-mcnews/2023/08/AI-trip-planners-1.jpg?impolicy=website&width=1600&height=900',
    'https://img.freepik.com/premium-photo/tourism-day-suitcase-collages-design_23-2151721770.jpg',
];

function Hero() {
    return (
        <div className="container mx-auto  justify-between px-4 py-12">
            {/* Image Slider */}
            <div className="mb-12">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {sliderImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-3/4 h-[457px] object-cover rounded-xl mx-auto"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            {/* Hero Content */}
            <h1 className="font-bold text-[55px] text-center mt-12">
                <span className="text-[#f56551]">Discover Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
            </h1>
            <p className="text-xl text-gray-500 text-center mt-4">Logosipsum is your ultimate AI-powered travel companion. Tell us your travel preferences, and we'll craft the perfect itinerary just for you.</p>
            <p className="text-xl text-gray-500 text-center">Scroll down to start planning</p>
            <p className="text-xl text-gray-500 text-center mt-4">Ready to start planning your dream vacation? Share your travel destination, days, budget, and travel group preferences with us.</p>
            <br />
            <br />
            {/* Landing Page Image */}
            <div className="flex justify-center">

                <img src="/landing_page.jpg" className="w-3/4 h-auto  rounded-xl" />
            </div>


            {/* Steps for Using the AI Trip Planner */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-left mb-8">How It Works :</h2>
                <div className="flex flex-col gap-6">
                    {[
                        { step: "Step 1:", text: "Login using your Gmail account." },
                        { step: "Step 2:", text: "Enter your travel destination and the number of days you plan to stay." },
                        { step: "Step 3:", text: "Select your budget type: Budget-Friendly, Moderate, or Luxury." },
                        { step: "Step 4:", text: "Choose your travel group: Solo Traveler, Couple, Family, or Friends." },
                        { step: "Step 5:", text: "Let our AI create a personalized itinerary for you!" }
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow w-full md:w-3/4 lg:w-2/3 flex items-center">
                            <h3 className="text-xl font-bold text-[#f56551] mr-3">{item.step}</h3>
                            <p className="text-lg text-gray-700">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Get Started Button */}
            <div className="text-center mt-12">
                <Link to={'/create-trip'}>
                    <Button className="bg-[#f56551] text-white px-8 py-3 rounded-full shadow-md hover:bg-[#e5533d] transition-colors">
                        Get Started, It's Free
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Hero;


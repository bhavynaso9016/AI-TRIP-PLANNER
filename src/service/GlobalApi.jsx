// import axios from "axios";

// export const GetPlaceDetails = async () => {
//     try {
//         const response = await axios.get(
//             "https://places.googleapis.com/v1/places:searchText",
//             {
//                 headers: {
//                     Authorization: `Bearer YOUR API KEY`,
//                     // Include other headers if necessary
//                     "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
//                     "Content-Type": "application/json",

//                 },
//             }
//         );
//         console.log(response.data);
//     } catch (error) {
//         console.error(
//             "Error fetching data:",
//             error.response ? error.response.data : error.message
//         );
//     }
// };

import axios from "axios";
const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': ['places.photos', 'places.displayName', 'places.id']
    }
};

export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);
export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY

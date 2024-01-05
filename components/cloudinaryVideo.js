import { Video, CloudinaryContext } from "cloudinary-react";
import { useState } from "react";

export default function CloudinaryVideo({ publicId }) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
    }

    return (
        <div>
            <CloudinaryContext cloudName="djncj31nj">
                <Video
                    publicId={publicId}
                    className={`w-full h-full object-cover ${!isVideoLoaded ? 'hidden' : ''}`} // Hide video until loaded
                    // controls
                    crop="scale"
                    autoPlay
                    loop
                    onLoadedData={handleVideoLoaded} // This will now be called when the video data is loaded
                />
            </CloudinaryContext>
        </div>
    );
}
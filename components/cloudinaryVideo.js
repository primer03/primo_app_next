import { Video, CloudinaryContext, Transformation } from "cloudinary-react";
import { useState } from "react";

export default function CloudinaryVideo({ publicId }) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
    }

    return (
        <div className="w-full">
            <div className="flex w-full justify-center">
                <div className="w-36">
                    <CloudinaryContext cloudName="djncj31nj">
                        <Video
                            publicId={publicId}
                            className={`w-full h-full object-cover ${!isVideoLoaded ? 'hidden' : ''}`}
                            crop="fill" // Changed from 'pad' to 'fill'
                            autoPlay
                            loop
                            muted
                            onLoadedData={handleVideoLoaded}
                        >
                            <Transformation quality="auto" fetchFormat="auto" />
                        </Video>
                        {!isVideoLoaded && <div>Loading...</div>} {/* Placeholder or loading indicator */}
                    </CloudinaryContext>
                </div>
            </div>
        </div>
    );
}
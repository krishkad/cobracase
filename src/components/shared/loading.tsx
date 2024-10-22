import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const DotLoading = ({ width, height, className }: { className?: string, width: number, height: number }) => {
    return (
        <div>
            <Player
                style={{ height, width }} // Adjust size if needed
                className={className ? className: ""}
                autoplay
                loop
                src={'/loading.json'}
            />
        </div>
    );
};

export default DotLoading;

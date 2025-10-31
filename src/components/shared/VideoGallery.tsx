"use client";
import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ReactPlayer from "react-player";

interface VideoGalleryProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    videoUrl: string;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ open, setOpen, videoUrl }) => {
    return (
        <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={[{ src: "" }]} // Placeholder slide (content comes from render.slide)
            render={{
                slide: () => (
                    <ReactPlayer autoPlay width="100%" height="100%" src={videoUrl} />
                ),
            }}
            styles={{
                container: {
                    backgroundColor: "rgba(0, 0, 0, 0.95)",
                },
            }}
        />
    );
};

export default VideoGallery;

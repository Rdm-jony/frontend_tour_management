"use client";

import { ITour } from "@/types/tour.type";
import Image from "next/image";
import imagePlaceHolder from "@/assets/image-gallery.png";
import { CameraIcon, CircleUser, Dot, LocationEdit, StarIcon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ImageGallery from "../../shared/ImageGallery";
import VideoGallery from "../../shared/VideoGallery";
import Link from "next/link";

const TourCardVertical = ({ tour }: { tour: ITour }) => {
  const [openGallery, setOpenGallery] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <div className="w-full border-2 rounded-lg shadow-lg shadow-green-100 overflow-hidden bg-white">
      
      {/* Top Image */}
      <div className="h-60 relative overflow-hidden">
        <Image
          src={tour.images && tour.images.length > 0 ? tour.images[0] : imagePlaceHolder}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          priority
        />

        <div className="absolute bottom-4 flex justify-center gap-4 w-full opacity-0 hover:opacity-100 transition-opacity duration-300">
          {tour.videoUrl && (
            <Button onClick={() => setOpenVideo(true)} className="bg-secondary text-primary hover:text-white">
              <VideoIcon /> View Video
            </Button>
          )}
          {tour.images?.length && (
            <Button onClick={() => setOpenGallery(true)} className="bg-secondary text-primary hover:text-white">
              <CameraIcon /> {tour.images.length} Photos
            </Button>
          )}
        </div>
      </div>

      {/* Tour Info */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold capitalize hover:text-primary cursor-pointer">{tour.title}</h3>

        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <LocationEdit className="text-green-600" size={15} /> {tour.location ?? "Not provided"}, {tour.division.name}
        </p>

        <p className="flex items-center gap-2">
          <span className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} size={15} className="text-orange-500" />
            ))}
          </span>
          <span className="text-sm">{tour.totalReviews || 0} reviews</span>
        </p>

        <p className="flex items-start gap-1">
          <span className="text-green-600"><Dot /></span>
          <span className="line-clamp-3 text-ellipsis leading-6">{tour.description}</span>
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 border p-2 border-green-600 rounded-lg text-green-600">
            <CircleUser size={20} /> {tour.maxGuest || 0}
          </div>
          <p className="font-bold text-lg">{tour.costForm || "00"} BDT</p>
          <Link href={`/tour/${tour._id}`}><Button>Explore</Button></Link>
        </div>
      </div>

      {/* Galleries */}
      {tour.images && tour.images.length > 0 && (
        <ImageGallery open={openGallery} setOpen={setOpenGallery} images={tour.images} />
      )}
      {tour.videoUrl && <VideoGallery open={openVideo} setOpen={setOpenVideo} videoUrl={tour.videoUrl} />}
    </div>
  );
};

export default TourCardVertical;

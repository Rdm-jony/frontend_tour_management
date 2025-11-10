"use client";
import { ITour } from "@/types/tour.type";
import Image from "next/image";
import imagePlaceHolder from "@/assets/image-gallery.png";
import {
  CameraIcon,
  CircleUser,
  Dot,
  Edit,
  Info,
  MapPin,
  StarIcon,
  Trash2,
  VideoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ImageGallery from "../../shared/ImageGallery";
import VideoGallery from "../../shared/VideoGallery";
import { useRouter } from "next/navigation";
import DrawerComponent from "@/components/shared/Drawer";
import EditTour from "../dashboard/EditTour";

const TourCardAdmin = ({ tour }: { tour: ITour }) => {
  const [openGallery, setOpenGallery] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/tour/${tour._id}`);
  };

  return (
    <div className="w-full flex flex-col md:flex-row border-2 rounded-lg group shadow-md shadow-green-100 overflow-hidden">
      {/* Image section */}
      <div className="relative w-full md:w-1/3 h-56 md:h-60 overflow-hidden">
        <Image
          src={
            tour.images && tour.images.length > 0
              ? tour.images[0]
              : imagePlaceHolder
          }
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          priority
        />

        {/* Hover actions (hidden on mobile) */}
        <div className="hidden md:flex absolute bottom-5 justify-center gap-3 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={() => setOpenVideo(true)}
            className="bg-secondary text-primary hover:text-white"
          >
            <VideoIcon size={16} /> View Video
          </Button>
          <Button
            onClick={() => setOpenGallery(true)}
            className="bg-secondary text-primary hover:text-white"
          >
            <CameraIcon size={16} /> {tour.images?.length || 0} Photos
          </Button>
        </div>
      </div>

      {/* Content section */}
      <div className="flex flex-col md:flex-row w-full md:w-2/3 p-4 gap-4">
        {/* Left content */}
        <div className="flex-1 space-y-2">
          <h3 className="capitalize font-semibold text-lg md:text-xl">
            <span
              onClick={handleNavigate}
              className="hover:text-primary cursor-pointer"
            >
              {tour.title}
            </span>
          </h3>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="text-green-600" size={15} />
            {tour.location ?? "Not provided"}, {tour.division.name}
          </p>

          <p className="flex gap-2 items-center">
            <span className="flex items-center text-orange-500">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} size={15} />
              ))}
            </span>
            <span className="text-sm text-gray-600">1 review</span>
          </p>

          <p className="flex text-sm text-gray-700 leading-6">
            <Dot className="text-green-600" />
            <span className="line-clamp-2">{tour.description}</span>
          </p>
        </div>

        {/* Right side info (guests & cost) */}
        <div className="flex md:flex-col justify-between md:justify-center items-center gap-3 md:gap-2">
          <div className="flex items-center border border-green-600 text-green-600 px-2 py-1 rounded-lg text-sm">
            <CircleUser size={18} className="mr-1" /> {tour.maxGuest || 0}
          </div>
          <p className="font-bold text-lg md:text-xl text-green-700">
            {tour.costForm || "00"} BDT
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex md:flex-col justify-center items-center gap-2 mt-3 md:mt-0">
          <Button
            className="bg-green-500 hover:bg-green-600  md:w-full"
            size="sm"
            onClick={handleNavigate}
          >
            <Info className="w-4 h-4 mr-1" /> See More
          </Button>
          <Button
            onClick={() => setOpenDrawer(true)}
            size="sm"
            variant="outline"
            className=" md:w-full"
          >
            <Edit className="w-4 h-4 mr-1" /> Update
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="md:w-full"
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      </div>

      {/* Galleries & Drawer */}
      {tour.images && tour.images?.length > 0 && (
        <ImageGallery
          open={openGallery}
          setOpen={setOpenGallery}
          images={tour.images}
        />
      )}
      {tour.videoUrl && (
        <VideoGallery
          open={openVideo}
          setOpen={setOpenVideo}
          videoUrl={tour.videoUrl}
        />
      )}
      <DrawerComponent open={openDrawer} setOpen={setOpenDrawer}>
        <EditTour setOpen={setOpenDrawer} tour={tour} />
      </DrawerComponent>
    </div>
  );
};

export default TourCardAdmin;

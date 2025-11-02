"use client"
import { ITour } from "@/types/tour.type";
import Image from "next/image";
import imagePlaceHolder from "@/assets/image-gallery.png"
import { CameraIcon, CircleUser, Dot, Edit, Info, LocationEdit, StarIcon, Trash2, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ImageGallery from "../../shared/ImageGallery";
import VideoGallery from "../../shared/VideoGallery";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DrawerComponent from "@/components/shared/Drawer";
import EditTour from "../dashboard/EditTour";

const TourCardAdmin = ({ tour }: { tour: ITour }) => {
    const [openGallery, setOpenGallery] = useState(false)
    const [openVideo, setOpenVideo] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)

    const router = useRouter()
    const handleNavigate = () => {
        router.push(`/tour/${tour._id}`)
    }
    return (
        <div className="w-full flex border-2 rounded-lg group shadow-lg shadow-green-100 pr-5">
            <div className="h-60 relative w-1/3  overflow-hidden rounded-l-lg">
                <Image
                    src={tour.images && tour.images.length > 0 ? tour.images[0] : imagePlaceHolder}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-500 ease-in-out"
                    priority
                />

                <div className="group-hover:absolute bottom-10 flex justify-center gap-5 w-full translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-transform duration-500 ease-in-out">
                    <Button onClick={() => setOpenVideo(true)} className="bg-secondary text-primary hover:text-white cursor-pointer"><VideoIcon /> View Video</Button>
                    <Button onClick={() => setOpenGallery(true)} className="bg-secondary text-primary hover:text-white cursor-pointer"><CameraIcon />{tour.images?.length} Photos</Button>
                </div>
            </div>
            <div className="w-2/3 flex p-5 gap-5">
                <div className="w-2/3 space-y-2.5">
                    <h3 className="capitalize font-semibold text-xl "> <span className="hover:text-primary  cursor-pointer">{tour.title}</span></h3>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground"><LocationEdit className="text-green-600" size={15} />{tour.location ?? "not provide"}, {tour.division.name}</p>
                    <p className="flex gap-2">
                        <span className="flex items-center">
                            <StarIcon size={15} className="text-orange-500" />
                            <StarIcon size={15} className="text-orange-500" />
                            <StarIcon size={15} className="text-orange-500" />
                            <StarIcon size={15} className="text-orange-500" />
                            <StarIcon size={15} className="text-orange-500" />
                        </span>
                        <span className="text-sm">1 reviews</span>
                    </p>
                    <p className="flex"><span className="text-green-600"><Dot /></span> <span className="line-clamp-2 text-ellipsis leading-7">{tour.description}</span></p>
                </div>
                <div className="flex w-20 h-10 justify-center text-green-600 items-center gap-1 border p-2 border-green-600 rounded-lg"><CircleUser size={20} /> {tour.maxGuest || 0}</div>
                <div className="border-r"></div>
                <p className="font-bold text-lg">{tour.costForm || '00'} BDT</p>

            </div>
            <div className="flex flex-col  justify-center gap-2">

                <Button className="cursor-pointer bg-green-500" size="sm"  onClick={handleNavigate} >
                    <Info className="w-4 h-4" />
                    See More
                </Button>
                <Button onClick={() => setOpenDrawer(true)} className="cursor-pointer" size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                    Update Tour
                </Button>
                <Button className="cursor-pointer" size="sm" variant="destructive" >
                    <Trash2 className="w-4 h-4" />
                    Delete Tour
                </Button>
            </div>
            {
                tour.images && tour.images?.length > 0 && <ImageGallery open={openGallery} setOpen={setOpenGallery} images={tour.images} />

            }
            {
                tour.videoUrl && <VideoGallery open={openVideo} setOpen={setOpenVideo} videoUrl={tour.videoUrl} />
            }
            {
                <DrawerComponent open={openDrawer} setOpen={setOpenDrawer}>
                    <EditTour setOpen={setOpenDrawer} tour={tour} />
                </DrawerComponent>
            }
        </div>
    );
};

export default TourCardAdmin;
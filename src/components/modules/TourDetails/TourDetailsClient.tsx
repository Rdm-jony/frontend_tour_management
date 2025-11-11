/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button";
import { ITour } from "@/types/tour.type";
import { CameraIcon, LocationEdit, MapPin, Share2, StarIcon, User2, Users, VideoIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

import 'swiper/css';
import DetailImageSwiper from "@/components/modules/TourDetails/DetailImageSwiper";
import VideoGallery from "@/components/shared/VideoGallery";
import ImageGallery from "@/components/shared/ImageGallery";
import IncludeExclude from "@/components/modules/TourDetails/IncludeExclude";
import Map from "@/components/modules/TourDetails/Map";
import TourBooking from "@/components/modules/TourDetails/TourBooking";
import TourReviews from "../review/TourReviews";
import StarRating from "../review/StarRating";
import { getCookie } from "@/utils/tokenHandlers";

const fetcher = async (url: string) => {
    const token = await getCookie("accessToken");
    return fetch(url, { headers: { "authorization": `${token}` }, next: { tags: ["tour"] } }).then((res) => res.json());
}
const TourDetailsClient = ({ initialData, slug }: { initialData: any, slug: string }) => {
    const [openGallery, setOpenGallery] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);

    const url = `https://beckend-tour-management.vercel.app/api/v1/tour/${slug}`;
    const { data } = useSWR(url, fetcher, { fallbackData: initialData });

    const tour = data?.data as ITour;
    return (
        <div>
            <div className="p-10 bg-green-50">
                <div className="md:flex justify-between items-center mb-5">
                    <h2 className="md:text-5xl text-3xl font-semibold mb-5 md:mb-0">{tour?.title}</h2>
                    <div className="flex gap-5 items-center">
                        <Button onClick={() => setOpenVideo(true)} className="bg-secondary text-primary hover:text-white cursor-pointer"><VideoIcon /> View Video</Button>
                        <Button onClick={() => setOpenGallery(true)} className="bg-secondary text-primary hover:text-white cursor-pointer"><CameraIcon />{tour?.images?.length} Photos</Button>
                        <Button onClick={() => setOpenGallery(true)} className="bg-secondary text-primary hover:text-white cursor-pointer"><Share2 /></Button>
                    </div>
                </div>
                <div className="md:flex gap-5 items-center">
                    <p className="flex items-center gap-2"><LocationEdit className="text-green-600" size={15} />{tour?.location ?? "not provide"}, {tour?.division?.name}</p>
                    <p className="flex gap-2 items-center">
                        <span className="flex items-center">
                            <StarRating value={tour.averageRating || 0} onChange={() => { }} />
                        </span>
                        <span className="text-sm">( {tour.totalReviews} reviews )</span>
                    </p>
                </div>
                <div className="my-10">
                    {
                        tour?.images && < DetailImageSwiper images={tour?.images} />

                    }
                </div>
                <div className="md:flex gap-20 space-y-2">
                    <div className="flex items-center gap-2">
                        <Users className="text-primary" />
                        <div>
                            <p className="font-semibold">Max People</p>
                            <p className="font-semibold text-muted-foreground">{tour?.maxGuest || 0}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <User2 className="text-primary" />
                        <div>
                            <p className="font-semibold">Min Age</p>
                            <p className="font-semibold text-muted-foreground">{tour?.minAge || 0}+</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="text-primary" />
                        <div>
                            <p className="font-semibold">Location</p>
                            <p className="font-semibold text-muted-foreground">{tour?.location}, {tour?.division?.name}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:p-10 p-0 flex md:flex-row flex-col-reverse">
                <div className="md:pr-10 pr-0">
                    <div>
                        <h3 className="font-semibold text-2xl">Overview</h3>
                        <p className="text-justify my-2">{tour?.description}</p>
                    </div>

                    <div>
                        <IncludeExclude included={tour?.included || []} excluded={tour?.excluded || []} />
                    </div>
                    <div className="my-5">
                        {
                            tour?.lat && tour?.lng && <Map lat={Number(tour?.lat)} lng={Number(tour?.lng)} />
                        }

                    </div>
                    <TourReviews tourId={tour._id as string} />

                </div>
                <div className="my-5 md:my-0">
                    <TourBooking tour={tour} />
                </div>
            </div>
            {
                tour?.videoUrl && <VideoGallery open={openVideo} setOpen={setOpenVideo} videoUrl={tour?.videoUrl} />

            }{
                tour?.images && <ImageGallery open={openGallery} setOpen={setOpenGallery} images={tour?.images} />

            }
        </div>
    );
};

export default TourDetailsClient;
"use client"
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";
import ImageGallery from "@/components/shared/ImageGallery";
import { useState } from "react";

const DetailImageSwiper = ({ images }: { images: string[] }) => {
    const [openGallery, setOpenGallery] = useState(false)
    const [showImg, setShowImg] = useState(images[0])

    return (
        <Swiper
            className="relative group"
            modules={[Autoplay, Navigation]}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false
            }}
            speed={800}
            loop={true}
            spaceBetween={30}
            breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 3 },
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom"
            }}
        >
            {
                images?.map((image: string, idx: number) => <SwiperSlide key={idx} >
                    <div className="h-80 cursor-pointer" onClick={() => setOpenGallery(true)}>
                        <Image onClick={() => setShowImg(image)} className="rounded-lg" fill alt={image} src={image}></Image>
                    </div>
                </SwiperSlide>)
            }

            <div className=" group-hover:opacity-100 opacity-0 transition-opacity duration-400 ease-in-out">
                <div className="swiper-button-prev-custom absolute left-2 top-1/2 translate-y-[-50%] z-10 cursor-pointer text-primary bg-secondary px-3 py-2 rounded-full">
                    <ArrowLeft />
                </div>
                <div className="swiper-button-next-custom absolute right-2 top-1/2 translate-y-[-50%] z-10 cursor-pointer text-primary bg-secondary px-3 py-2 rounded-full">
                    <ArrowRight />
                </div>
            </div>

            <ImageGallery open={openGallery} setOpen={setOpenGallery} images={[showImg, ...images.filter(image => image != showImg)]} />
        </Swiper>
    );
};

export default DetailImageSwiper;
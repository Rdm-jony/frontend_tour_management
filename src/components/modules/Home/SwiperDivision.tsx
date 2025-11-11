"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules"; // ✅ import module

import 'swiper/css';
import { IDivision } from '@/types/division.type';
import DivisionCard from '@/components/shared/DivisionCard';

const SwiperDivision = ({ divisions }: { divisions: IDivision[] }) => {
    return (
        <Swiper
            modules={[Autoplay]}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false
            }}
            speed={800}
            loop={true}
            spaceBetween={50}
            breakpoints={{
                0: { slidesPerView: 1 }, 
                768: { slidesPerView: 3 },
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                divisions?.map((division: IDivision, idx: number) => <SwiperSlide key={idx} > <DivisionCard division={division} /></SwiperSlide>)
            }


        </Swiper>
    );
};

export default SwiperDivision;
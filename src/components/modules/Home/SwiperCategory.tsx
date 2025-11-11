"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules"; // ✅ import module

import 'swiper/css';
import { ITourType } from '@/types/category.type';
import CategoryCard from '@/components/shared/CategoryCard';

const SwiperCategory = ({ categories }: { categories: ITourType[] }) => {
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
                categories?.map((category: ITourType, idx: number) => <SwiperSlide key={idx} > <CategoryCard category={category} /></SwiperSlide>)
            }


        </Swiper>
    );
};

export default SwiperCategory;
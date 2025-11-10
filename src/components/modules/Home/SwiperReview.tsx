"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules"; // ✅ import module

import 'swiper/css';
import { IReview } from '@/types/review.type';
import ReviewCard from '../review/ReviewCard';

const SwiperReview = ({ reviews }: { reviews: IReview[] }) => {
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
                1024: { slidesPerView: 4 }
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                reviews?.map((review: IReview, idx: number) => <SwiperSlide key={idx} > <ReviewCard review={review} /></SwiperSlide>)
            }


        </Swiper>
    );
};

export default SwiperReview;
import SectionTitle from "@/components/shared/SectionTitle";
import SwiperReview from "./SwiperReview";

const TopReview = async () => {
    const data = await fetch('https://beckend-tour-management.vercel.app/api/v1/review/top')
    const reviews = await data.json()
    return (
        <div>
            <SectionTitle
                title="What our happy clients say"
                subTitle=""
            />
            <SwiperReview reviews={reviews.data} />
        </div>
    );
};

export default TopReview;
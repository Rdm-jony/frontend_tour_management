
import SectionTitle from "@/components/shared/SectionTitle";
import SwiperDivision from "./SwiperDivision";



const Division = async () => {
    const data = await fetch('https://beckend-tour-management.vercel.app/api/v1/division')
    const divisions = await data.json()
    return (
        <div className="my-20">
            <SectionTitle
                title="Features Destinations"
                subTitle="An enim nullam tempor gravida donec enim congue magna at pretium purus"
            />
            <SwiperDivision divisions={divisions.data} />
        </div>
    );
};

export default Division;

import SectionTitle from "@/components/shared/SectionTitle";
import SwiperCategory from "./SwiperCategory";



const Categoty = async () => {
    const data = await fetch('http://localhost:5000/api/v1/tour/tour-types')
    const categories = await data.json()
    return (
        <div className="my-20">
            <SectionTitle
                title="Popular Category"
                subTitle="An enim nullam tempor gravida donec enim congue magna at pretium purus pretium ligula rutrum luctus risusd diam eget risus varius blandit sit amet non magna."
            />
            <SwiperCategory categories={categories.data} />
        </div>
    );
};

export default Categoty;
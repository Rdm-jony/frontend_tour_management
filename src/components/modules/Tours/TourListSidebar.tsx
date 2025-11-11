import TourListReview from "./ToureListReview";
import TourListCategory from "./TourListCategory";
import TourListDivision from "./TourListDivision";
import TourListPriceRange from "./TourListPriceRange";

const TourListSidebar = async () => {
    const divisionData = await fetch('https://beckend-tour-management.vercel.app/api/v1/division')
    const divisions = await divisionData.json()

    const categoryData = await fetch('https://beckend-tour-management.vercel.app/api/v1/tour/tour-types')
    const categories = await categoryData.json()
    return (
        <div className=" p-5  border-2 border-t-0 rounded-lg  h-screen overflow-y-auto sticky top-10">
            <TourListDivision divisions={divisions.data} />
            <TourListCategory categories={categories.data} />
            <TourListPriceRange />
            <TourListReview />
        </div>
    );
};

export default TourListSidebar;
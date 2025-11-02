import TourListCategory from "./TourListCategory";
import TourListDivision from "./TourListDivision";

const TourListSidebar = async () => {
    const divisionData = await fetch('http://localhost:5000/api/v1/division')
    const divisions = await divisionData.json()

    const categoryData = await fetch('http://localhost:5000/api/v1/tour/tour-types')
    const categories = await categoryData.json()
    return (
        <div className="h-screen p-5 px-20 border-2 border-t-0 rounded-lg">
            <TourListDivision divisions={divisions.data} />
            <TourListCategory categories={categories.data} />
        </div>
    );
};

export default TourListSidebar;
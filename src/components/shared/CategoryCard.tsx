import { ITourType } from "@/types/category.type";
import Image from "next/image";
import imagePlaceHolder from "@/assets/image-gallery.png"
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryCard = ({ category }: { category: ITourType }) => {
    const searchParams = useSearchParams();
    const router=useRouter()

    const handleNavigate = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("tourType", value)
        const queryString = params.toString();
        router.push(queryString ? `/tours?${queryString}` : "/tours");
    }
    return (
        <div className="group">
            <div className="relative h-50 w-full">
                <Image
                    src={category.image ?? imagePlaceHolder}
                    alt={category.name || "category image"}
                    fill
                    className="object-cover rounded-t-lg"
                    priority
                />
                <div className="group-hover:absolute rounded-t-lg group-hover:transition duration-500 ease-in-out  inset-0 bg-black opacity-55"></div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <Button
                        size="icon"
                        onClick={() => handleNavigate(category._id as string)}
                        className="rounded-full w-12 h-12 cursor-pointer opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0"
                    >
                        <ArrowUpRight size={24} />
                    </Button>
                </div>

            </div>
            <p className="font-semibold text-xl mt-2">{category.name}</p>
            <p className="text-muted-foreground text-sm">{category.totalTours} Available Tour Place</p>

        </div>
    );
};

export default CategoryCard;
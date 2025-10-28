"use client"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ITourType } from "@/types/category.type";
import { useRouter, useSearchParams } from "next/navigation";

const TourListCategory = ({ categories }: { categories: ITourType[] }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const handleCategory = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("tourType", value)
        router.push(`?${params.toString()}`)
    }

    const selectedValue = searchParams.get("tourType") || ''

    return (
        <div>
            <h3 className="my-5 font-bold">Categories</h3>
            <RadioGroup onValueChange={handleCategory} defaultValue={selectedValue}>
                {
                    categories && categories?.map((category: ITourType) => <div key={category._id} className="flex items-center space-x-2">
                        <RadioGroupItem value={category._id as string} id={category._id} />
                        <Label htmlFor={category._id}>{category.name}</Label>
                    </div>
                    )
                }
            </RadioGroup>

        </div>
    );
};

export default TourListCategory;
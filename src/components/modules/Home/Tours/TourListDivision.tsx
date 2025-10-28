"use client"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IDivision } from "@/types/division.type";
import { useRouter, useSearchParams } from "next/navigation";

const TourListDivision = ({ divisions }: { divisions: IDivision[] }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const handleDivision = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("division", value)
        router.push(`?${params.toString()}`)
    }

    const selectedValue=searchParams.get("division") || ''


    return (
        <div>
            <h3 className="my-5 font-bold">Divisions</h3>
            <RadioGroup onValueChange={handleDivision} defaultValue={selectedValue}>
                {
                    divisions && divisions?.map((division: IDivision) => <div key={division._id} className="flex items-center space-x-2">
                        <RadioGroupItem value={division._id as string} id={division._id} />
                        <Label htmlFor={division._id}>{division.name}</Label>
                    </div>
                    )
                }
            </RadioGroup>

        </div>
    );
};

export default TourListDivision;
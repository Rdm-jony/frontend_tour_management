"use client"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IDivision } from "@/types/division.type";
import { useRouter, useSearchParams } from "next/navigation";

const TourListDivision = ({ divisions }: { divisions: IDivision[] }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleDivision = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value === "all") {
            params.delete("division");
        } else {
            params.set("division", value);
        }
        const queryString = params.toString();
        router.push(queryString ? `?${queryString}` : "/tours");
    };




    const selectedDivision = searchParams.get("division") || "all";


    return (
        <div>
            <h3 className="my-5 font-bold">Divisions</h3>
            <RadioGroup onValueChange={handleDivision} value={selectedDivision}>
                <div key="all" className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className={selectedDivision == 'all' ? 'text-primary' : ""}>All</Label>
                </div>
                {
                    divisions && divisions?.map((division: IDivision) => <div key={division._id} className="flex items-center space-x-2">
                        <RadioGroupItem value={division._id as string} id={division._id} />
                        <Label htmlFor={division._id} className={selectedDivision == division._id ? 'text-primary' : ""}>{division.name}</Label>
                    </div>
                    )
                }
            </RadioGroup>

        </div>
    );
};

export default TourListDivision;
import { CircleCheckBig, CircleX } from "lucide-react";

const IncludeExclude = ({ included, excluded }: { included: string[], excluded: string[] }) => {
    return (
        <div>
            <h3 className="font-semibold text-2xl mt-10">Included/Excluded</h3>
            <div className="flex gap-20 mt-2">
                <div>
                    {
                        included?.map((t: string) => <div key={t} className="flex items-ccenter gap-2 my-2">
                            <CircleCheckBig className="text-green-500" size={20} />
                            <p>{t}</p>
                        </div>)
                    }
                </div>
                <div>
                    {
                        excluded?.map((t: string) => <div key={t} className="flex items-ccenter gap-2 my-2">
                            <CircleX className="text-red-500" size={20} />
                            <p>{t}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>

    );
};

export default IncludeExclude;
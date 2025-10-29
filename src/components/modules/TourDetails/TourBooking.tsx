import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const TourBooking = () => {
    const [count, setCount] = useState(1)
    return (
        <div className="border space-y-4 p-10 sticky top-1/2 shadow-lg rounded-lg">
            <div className="flex">
                <Button variant="outline" onClick={() => setCount(prev => prev - 1)} disabled={count <= 1} className="rounded-r-none"><Minus /></Button>
                <Button variant="outline" className="rounded-r-none rounded-l-none">{count}</Button>
                <Button variant="outline" onClick={() => setCount(prev => prev + 1)} disabled={count>=6} className="rounded-l-none"><Plus /></Button>

            </div>
            <p className="font-semibold text-muted-foreground text-sm">Max Guest: 5</p>
            <p className="font-semibold text-xl">Total: 5 BDT</p>
            <Button className="w-full">Book Now</Button>
        </div>
    );
};

export default TourBooking;

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import TourListSidebar from "@/components/modules/Tours/TourListSidebar";

export default function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild className="sticky top-5">
                <Button variant="outline" className="w-full">Filters</Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
                <TourListSidebar />
            </SheetContent>
        </Sheet>
    );
}

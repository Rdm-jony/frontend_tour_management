"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { MapPin, Search, Type } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import useSWR from "swr";
import { useState } from "react";
import { IDivision } from "@/types/division.type";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ITourType } from "@/types/category.type";

const slides = [
  { src: "/hero/hero1.jpg", alt: "Hero Image 1" },
  { src: "/hero/hero2.jpg", alt: "Hero Image 2" },
  { src: "/hero/hero3.jpg", alt: "Hero Image 3" },
];

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Hero = () => {
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const [selectedDivisionName, setSelectedDivisionName] = useState<string>("Select a place");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("Select a place");

  const divisionUrl = `https://beckend-tour-management.vercel.app/api/v1/division`;
  const categoryUrl = `https://beckend-tour-management.vercel.app/api/v1/tour/tour-types`;

  const { data: divisonData, isLoading: isLoadingDivision } = useSWR(divisionUrl, fetcher);
  const { data: categoryData, isLoading: isLoafdingCategory } = useSWR(categoryUrl, fetcher);

  const divisions = divisonData?.data as IDivision[];
  const categories = categoryData?.data as ITourType[];


  const searchParams = useSearchParams();
  const router = useRouter()

  const handleNavigate = () => {
    const params = new URLSearchParams(searchParams)
    if (selectedDivisionId) {
      params.set("division", selectedDivisionId)

    }
    if (selectedCategoryId) {
      params.set("tourType", selectedCategoryId)

    }
    const queryString = params.toString();
    router.push(queryString ? `/tours?${queryString}` : "/tours");
  }

  return (
    <div className="h-screen w-full relative">
      {/* Background Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators
        interval={3000}
        stopOnHover
        swipeable
      >
        {slides.map((slide, index) => (
          <div key={index} className="h-screen w-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
            />
          </div>
        ))}
      </Carousel>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-65" />

      {/* Content */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="md:text-6xl text-3xl font-semibold text-white">
            Millions of experiences. One simple search.
          </h2>
          <p className="text-white mt-5">
            Find what makes you happy anytime, anywhere
          </p>

          {/* Search Bar */}
          <div className="bg-white md:h-24 md:space-y-0 space-y-3 p-5 md:rounded-full rounded-2xl md:mx-0 mx-5 md:flex justify-between mt-10 items-center">
            {/* Division Selector */}
            <div className="flex gap-5 items-center">
              <MapPin />
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={isLoadingDivision}>
                  <div className="cursor-pointer">
                    <h3 className="font-semibold text-left">Where To?</h3>
                    <p className="md:text-lg text-muted-foreground">
                      {isLoadingDivision
                        ? "Loading divisions..."
                        : selectedDivisionName || "Search a place or destination"}
                    </p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {divisions?.map((division) => (
                    <DropdownMenuItem
                      key={division._id}
                      onClick={() => {
                        setSelectedDivisionId(division._id as string);
                        setSelectedDivisionName(division.name);
                      }}
                    >
                      {division.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Separator orientation="vertical" className="h-16 hidden md:block" />

            {/* Tour Type Selector */}
            <div className="flex gap-5 items-center">
              <Type />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <h3 className="font-semibold text-left">What Type?</h3>
                    <p className="md:text-lg text-muted-foreground">
                      {isLoadingDivision
                        ? "Loading tour types..."
                        : selectedCategoryName || "Search a place or tour type"}
                    </p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories?.map((category) => (
                    <DropdownMenuItem
                      key={category._id}
                      onClick={() => {
                        setSelectedCategoryId(category._id as string);
                        setSelectedCategoryName(category.name);
                      }}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Search Button */}
            <Button className="rounded-full md:w-12 md:h-12 w-0 h-0 cursor-pointer" size="icon-lg" onClick={() => handleNavigate()}>
              <Search />
            </Button>
            <Button className="w-full md:hidden cursor-pointer" onClick={() => handleNavigate()}>
              Search <Search className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

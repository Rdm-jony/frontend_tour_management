"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { LocationEditIcon, Search, Type } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";

// Array of image slides
const slides = [
  { src: "/hero/hero1.jpg", alt: "Hero Image 1" },
  { src: "/hero/hero2.jpg", alt: "Hero Image 2" },
  { src: "/hero/hero3.jpg", alt: "Hero Image 3" },
];

const Hero = () => {

  return (
    <div className="h-screen w-full relative ">
      <Carousel
        autoPlay={true}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators
        interval={3000}
        stopOnHover
        swipeable
      >
        {slides.map((slide, index) => (
          <div key={index} className="h-screen">
            <img
              src={slide.src}
              alt={slide.alt}
              className="object-cover h-full w-full"
            />
          </div>
        ))}
      </Carousel>

      <div className="absolute inset-0 bg-black opacity-65 ">
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="md:text-6xl text-3xl font-semibold text-white bg-transparent">Millions of experiences. One simple search.</h2>
          <p className="text-white mt-5">Find what makes you happy anytime, anywhere</p>

          <div className="bg-white md:h-24 md:space-y-0 space-y-3 p-5 md:rounded-full rounded-2xl md:mx-0 mx-5 md:flex justify-between mt-10">
            <div className="flex gap-5 items-center">
              <LocationEditIcon />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <h3 className="font-semibold text-left">Where To?</h3>
                    <p className="md:text-lg text-muted-foreground">Search a place or Activity Destinatio</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Option 1</DropdownMenuItem>
                  <DropdownMenuItem>Option 2</DropdownMenuItem>
                  <DropdownMenuItem>Option 3</DropdownMenuItem>
                  <DropdownMenuItem>Option 4</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
            <Separator orientation="vertical" className="h-16 " />
            <div className="flex gap-5 items-center ">
              <Type />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <h3 className="font-semibold text-left">What Type?</h3>
                    <p className="md:text-lg text-muted-foreground">Select a tour type</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Option 1</DropdownMenuItem>
                  <DropdownMenuItem>Option 2</DropdownMenuItem>
                  <DropdownMenuItem>Option 3</DropdownMenuItem>
                  <DropdownMenuItem>Option 4</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
            <Button className="rounded-full md:w-12 md:h-12 w-0 h-0 " size="icon-lg"><Search /></Button>
            <Button className="w-full md:hidden">Search <Search /></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";

const TourListPriceRange = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const minLimit = 0;
  const maxLimit = 10000;

  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get("minPrice")) || minLimit,
    Number(searchParams.get("maxPrice")) || maxLimit,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (priceRange[0] > minLimit) {
        params.set("minPrice", String(priceRange[0]));
      } else {
        params.delete("minPrice");
      }

      if (priceRange[1] < maxLimit) {
        params.set("maxPrice", String(priceRange[1]));
      } else {
        params.delete("maxPrice");
      }

      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : "/tours");
    }, 500);

    return () => clearTimeout(timer);
  }, [priceRange]);

  return (
    <div className="my-5 space-y-4">
      <h3 className="font-bold">Filter by Price</h3>

      <div className="flex items-center justify-between gap-2">
        <Label className="leading-6">Price Range (BDT)</Label>
        <output className="text-sm font-medium tabular-nums">
          {priceRange[0]} - {priceRange[1]}
        </output>
      </div>

      <Slider
        value={priceRange}
        onValueChange={(val) => setPriceRange(val)}
        min={minLimit}
        max={maxLimit}
        step={100}
        className="cursor-pointer"
      />
    </div>
  );
};

export default TourListPriceRange;

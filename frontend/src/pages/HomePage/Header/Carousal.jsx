import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Painting from "./Painting";
import { useGetAllPaintingsQuery } from '@/redux/api/paintings';

const Carousell = () => {
  const { data: paintings, isLoading } = useGetAllPaintingsQuery();
  
  return (
    <div className="flex justify-center mt-20 mb-16">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full p-7 max-w-[85vw] bg-purple-950 rounded-lg shadow-lg"
        >
          <CarouselContent className="flex flex-row gap-2 ">
            {paintings?.map((painting, index) => (
              <CarouselItem
                key={painting._id}
                className={` transition-transform duration-500 ease-in-out transform hover:scale-105 fex justify-center items-center basis-auto sm:basis-1/2 md:basis-1/3 w-full`}
              >
                <Card className="border border-slate-100 mb-0 w-full">
                  <CardContent className="h-full w-full mb-0 mt-3">
                    <Painting painting={painting} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" hover:text-gray-300 transition duration-300" />
          <CarouselNext className=" hover:text-gray-300 transition duration-300" />
        </Carousel>
      )}
    </div>
  );
};

export default Carousell;

import  React from "react"
import i1 from '../../../assets/p4.jpg'

import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Painting from "./Painting"

const Carousell=()=> {

    const paintings = [
        {
          _id: 1,
          name: "Starry Night",
          price: 25000,
          creator: "Vincent van Gogh",
          image:i1
        },
        {
          _id: 2,
          name: "Mona Lisa",
          price: 100000000,
          creator: "Leonardo da Vinci",
          image:i1
        },
        {
          _id: 3,
          name: "The Persistence of Memory",
          price: 15000000,
          creator: "Salvador Dali",
          image:i1
        },
        {
          _id: 4,
          name: "The Scream",
          price: 80000000,
          creator: "Edvard Munch",
          image:i1
        },
        {
          _id: 5,
          name: "Guernica",
          price: 200000000,
          creator: "Pablo Picasso",
          image:i1
        }
    ];
      
    console.log(paintings);
      

  return (
    <Carousel plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction:false,
          stopOnMouseEnter:true,

        }),
      ]}
      className="w-full p-7 max-w-[85vw] mx-auto  bg-purple-950 mt-32 mb-16">
      <CarouselContent >
        {paintings.map((painting) => (
          <CarouselItem key={painting._id} className='sm:basis-1/2 lg:basis-1/3'
          >
            <div >
              <Card className=" border border-slate-100  ">
                <CardContent className="p-0 " >
                  <Painting  painting={painting} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent >
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Carousell


























{/* {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className='pl-1 sm:basis-1/2 lg:basis-1/3'
          >
            <div className="p-1">
              <Card className="bg-gray-800">
                <CardContent className="flex aspect-square items-center justify-center p-6 ml-1 ">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}
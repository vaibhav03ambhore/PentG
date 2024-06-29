import  React from "react"

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
import { useGetAllPaintingsQuery } from '@/redux/api/paintings';

const Carousell=()=> {

  const {data:paintings, isLoading} = useGetAllPaintingsQuery();
  
  return (
    <div>
      {isLoading
      ?(<p>Loading...</p>)
      :(
        <Carousel plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction:false,
            stopOnMouseEnter:true,
  
          }),
          ]}
          className="w-full p-7 max-w-[85vw] mx-auto  bg-purple-950 mt-20 mb-16">
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
    </div>
    
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
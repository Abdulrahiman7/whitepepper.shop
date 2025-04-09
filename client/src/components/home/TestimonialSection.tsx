import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";
import { Testimonial } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestimonialSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });
  
  const totalPages = testimonials ? Math.ceil(testimonials.length / 3) : 0;
  
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: containerRef.current.clientWidth * (currentPage - 1),
          behavior: 'smooth'
        });
      }
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: containerRef.current.clientWidth * (currentPage + 1),
          behavior: 'smooth'
        });
      }
    }
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-amber-500 text-amber-500" size={18} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="fill-amber-500 text-amber-500" size={18} />);
    }
    
    return stars;
  };
  
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-md">
              <Skeleton className="h-4 w-24 mb-4" />
              <Skeleton className="h-20 w-full mb-6" />
              <div className="flex items-center">
                <Skeleton className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  return (
    <section className="container mx-auto px-4 mb-20">
      <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">What Our Customers Say</h2>
      
      <div className="relative overflow-hidden">
        {/* Testimonial Slider */}
        <div 
          ref={containerRef}
          className="flex overflow-x-scroll pb-8 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials?.map((testimonial) => (
            <div key={testimonial.id} className="min-w-full md:min-w-[33.333%] px-4 snap-start">
              <div className="bg-white rounded-lg p-6 h-full shadow-md">
                <div className="flex items-center text-amber-500 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.profileImageUrl} 
                      alt={testimonial.customerName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">{testimonial.customerName}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md text-primary hover:bg-primary hover:text-white transition duration-300 z-10"
          disabled={currentPage === 0}
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md text-primary hover:bg-primary hover:text-white transition duration-300 z-10"
          disabled={currentPage === totalPages - 1}
        >
          <ChevronRight size={20} />
        </button>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span 
              key={i}
              className={`w-2 h-2 rounded-full mx-1 ${currentPage === i ? 'bg-primary' : 'bg-gray-300'}`}
              onClick={() => {
                setCurrentPage(i);
                if (containerRef.current) {
                  containerRef.current.scrollTo({
                    left: containerRef.current.clientWidth * i,
                    behavior: 'smooth'
                  });
                }
              }}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

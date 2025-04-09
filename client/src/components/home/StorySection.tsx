import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function StorySection() {
  return (
    <section id="story" className="bg-primary py-20 mb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">Our Spice Heritage</h2>
            <p className="text-white/90 mb-6">
              Nestled in the misty hills of Coorg, Karnataka, our spice estates have been cultivating the finest spices for generations. The unique microclimate, rich soil, and traditional farming practices come together to create spices of unparalleled quality and flavor.
            </p>
            <p className="text-white/90 mb-8">
              Every WhitPepper product embodies our commitment to sustainable farming, fair trade practices, and preserving the traditional methods that have been passed down through generations of spice farmers in the region.
            </p>
            <Link href="/about">
              <Button className="bg-white text-primary hover:bg-amber-500 font-medium px-8 py-6">
                Learn More About Us
              </Button>
            </Link>
          </div>
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1601511654053-af53aab0c60c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Coorg Landscape" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1600532953553-514d84452811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=773&q=80" 
                alt="Spice Plantation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg col-span-2">
              <img 
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Spice Sorting" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

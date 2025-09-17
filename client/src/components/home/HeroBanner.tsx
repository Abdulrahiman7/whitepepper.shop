import { Link } from "wouter";

export default function HeroBanner() {
  return (
    <section className="relative h-80 sm:h-96   md:h-[500px] lg:h-[500px] mb-8 md:mb-16 overflow-hidden mt-20 md:mt-0">
      <div className="absolute inset-0 " >
        <img 
          src="public/hero-whitepepper.svg" 
          alt="Coorg landscape with spice plantation" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-2 sm:mb-4">
            Premium Spices from the Hills of Coorg
          </h1>
          <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8">
            Experience the authentic flavors of handpicked spices from Karnataka's spice garden
          </p>
          <div className="flex  gap-3 sm:gap-4">
            <Link href="#featured">
              <a className="bg-amber-500 hover:bg-amber-600 text-primary font-medium px-6 sm:px-8 py-2 sm:py-3 rounded-full transition duration-300 text-center text-sm sm:text-base">
                Shop Now
              </a>
            </Link>
            <Link href="#story">
              <a className="bg-transparent border-2 border-white text-white font-medium px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-white/10 transition duration-300 text-center text-sm sm:text-base">
                Our Story
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
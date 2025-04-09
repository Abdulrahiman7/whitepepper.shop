import { Link } from "wouter";

export default function HeroBanner() {
  return (
    <section className="relative h-96 md:h-[500px] mb-16 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1599909946881-5965eefa0cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Coorg landscape with spice plantation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
      </div>
      <div className="container mx-auto px-4 h-full flex items-center relative">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-4">
            Premium Spices from the Hills of Coorg
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Experience the authentic flavors of handpicked spices from Karnataka's spice garden
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#featured">
              <a className="bg-amber-500 hover:bg-amber-600 text-primary font-medium px-8 py-3 rounded-full transition duration-300 text-center">
                Shop Now
              </a>
            </Link>
            <Link href="#story">
              <a className="bg-transparent border-2 border-white text-white font-medium px-8 py-3 rounded-full hover:bg-white/10 transition duration-300 text-center">
                Our Story
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

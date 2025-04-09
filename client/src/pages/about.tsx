import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | WhitPepper Shop</title>
        <meta name="description" content="Learn about WhitPepper Shop and our premium spices from Coorg, Karnataka." />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] mb-16">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1599909946881-5965eefa0cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Coorg Landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/60"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-serif">Our Story</h1>
            <p className="text-white/90 mt-4 max-w-2xl">
              Discover the journey behind WhitPepper and our commitment to bringing the finest spices from Coorg to your kitchen
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg mb-8">
            At WhitPepper, our mission is to connect spice enthusiasts with the authentic flavors of Coorg, while supporting sustainable farming practices and empowering local communities. We believe that every meal deserves the finest ingredients, and every spice has a story to tell.
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-20 bg-amber-500"></div>
          </div>
        </div>
      </section>
      
      {/* Journey Section */}
      <section className="bg-[#F9F5F0] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Journey</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2018, WhitPepper began with a simple idea: to share the extraordinary spices of Coorg with the world. What started as a small family operation has grown into a beloved brand, trusted for its quality and commitment to tradition.
              </p>
              <p className="text-gray-700 mb-4">
                Our journey began when the founders, whose family has been cultivating spices for generations in the misty hills of Coorg, decided to bring their heirloom spices directly to consumers, bypassing middlemen and ensuring fair compensation for farmers.
              </p>
              <p className="text-gray-700">
                Today, we work with over 50 small-scale farmers across the region, maintaining the highest standards of quality while preserving traditional farming methods that have been passed down through generations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1600532953553-514d84452811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=773&q=80" 
                  alt="Spice Plantation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1601511654053-af53aab0c60c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Coorg Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-primary mb-3">Quality</h3>
            <p className="text-gray-700">
              We never compromise on quality. Each spice is carefully selected, processed, and packaged to preserve its natural oils, aroma, and flavor.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-amber-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-primary mb-3">Sustainability</h3>
            <p className="text-gray-700">
              We are committed to sustainable farming practices that protect the biodiversity of Coorg and ensure the longevity of its spice heritage.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-primary mb-3">Community</h3>
            <p className="text-gray-700">
              We believe in fair trade and supporting the local farming communities. A portion of every purchase goes back to community development projects in Coorg.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-white mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-1">Ajay Kumar</h3>
              <p className="text-gray-600 font-medium mb-2">Founder & CEO</p>
              <p className="text-gray-700 text-sm">
                Born and raised in Coorg, Ajay comes from a family with a 150-year history in spice cultivation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Co-Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-1">Priya Sharma</h3>
              <p className="text-gray-600 font-medium mb-2">Co-Founder & Head of Quality</p>
              <p className="text-gray-700 text-sm">
                With a background in food science, Priya ensures that every spice meets our rigorous quality standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/62.jpg" 
                  alt="Head of Sustainability" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-1">Vikram Reddy</h3>
              <p className="text-gray-600 font-medium mb-2">Head of Sustainability</p>
              <p className="text-gray-700 text-sm">
                Vikram leads our efforts in sustainable farming practices and community development initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-serif font-bold text-primary mb-6">Experience the WhitPepper Difference</h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-8">
          Join us on our journey to bring the authentic flavors of Coorg to kitchens around the world. Whether you're a professional chef or a home cooking enthusiast, our premium spices will elevate your culinary creations.
        </p>
        <Link href="/products">
          <Button className="bg-green-700 hover:bg-green-900 text-white px-8 py-6 text-lg">
            Shop Our Collection
          </Button>
        </Link>
      </section>
    </>
  );
}

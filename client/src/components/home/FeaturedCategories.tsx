import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedCategories() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Premium Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-80 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }
  
  // Only show first 3 categories
  const featuredCategories = categories?.slice(0, 3) || [];
  
  return (
    <section className="container mx-auto px-4 mb-20">
      <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Premium Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredCategories.map((category) => (
          <div key={category.id} className="relative overflow-hidden rounded-lg group h-80">
            <img 
              src={category.imageUrl} 
              alt={category.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">{category.name}</h3>
              <p className="text-white/90 mb-4">{category.description}</p>
              <Link href={`/products?category=${category.slug}`}>
                <a className="inline-block bg-white/20 hover:bg-white/40 text-white font-medium px-6 py-2 rounded-full transition duration-300 backdrop-blur-sm w-fit">
                  Explore
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

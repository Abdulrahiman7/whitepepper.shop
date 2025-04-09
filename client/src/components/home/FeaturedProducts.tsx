import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Product } from "@shared/schema";
import ProductCard from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProducts() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/best-sellers', 4],
  });
  
  const renderSkeletons = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
            <Skeleton className="h-64 w-full" />
            <div className="p-5">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-3" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <section id="featured" className="container mx-auto px-4 mb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-primary">Best Sellers</h2>
        <Link href="/products">
          <a className="text-green-700 hover:text-green-900 flex items-center gap-2 transition duration-200">
            View All <ChevronRight size={16} />
          </a>
        </Link>
      </div>

      {isLoading ? (
        renderSkeletons()
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

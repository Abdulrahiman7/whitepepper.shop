import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  categoryId?: number;
  searchQuery?: string;
}

export default function ProductGrid({ categoryId, searchQuery }: ProductGridProps) {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1]);
  const categoryParam = params.get('category');
  const searchParam = params.get('search');
  
  const queryKey = searchParam
    ? ['/api/products', { search: searchParam }]
    : categoryParam
    ? ['/api/products', { category: categoryParam }]
    : categoryId
    ? ['/api/products', { category: categoryId }]
    : searchQuery
    ? ['/api/products', { search: searchQuery }]
    : ['/api/products'];
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey,
  });
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
  }
  
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-primary font-medium mb-2">No products found</h3>
        <p className="text-gray-600">Try a different search or category.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

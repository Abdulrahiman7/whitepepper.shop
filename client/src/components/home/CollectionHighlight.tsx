import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function CollectionHighlight() {
  const { data: giftCollections, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products?category=5'],
  });
  
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Gift Collections</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-80 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }
  
  // Only show first 2 gift collections
  const featuredCollections = giftCollections?.slice(0, 2) || [];
  
  return (
    <section className="container mx-auto px-4 mb-20">
      <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Gift Collections</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredCollections.map((collection) => (
          <div key={collection.id} className="bg-[#F9F5F0] rounded-lg overflow-hidden flex flex-col md:flex-row shadow-md">
            <div className="md:w-1/2 overflow-hidden">
              <img 
                src={collection.imageUrl} 
                alt={collection.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-center">
              <span className="text-green-700 font-medium text-sm mb-2">
                {collection.name === "Coorg Signature Collection" ? "PREMIUM COLLECTION" : "CURATED SET"}
              </span>
              <h3 className="font-serif font-bold text-2xl text-primary mb-3">{collection.name}</h3>
              <p className="text-gray-700 mb-4">{collection.description}</p>
              <div className="flex items-center mb-4">
                <p className="text-xl font-medium text-primary mr-3">₹{collection.price.toFixed(0)}</p>
                {collection.discountPrice && (
                  <p className="text-sm line-through text-gray-500">₹{collection.discountPrice.toFixed(0)}</p>
                )}
              </div>
              <Link href={`/products/${collection.slug}`}>
                <Button className="bg-green-700 hover:bg-green-900 text-white font-medium px-6 py-3 rounded-full transition w-full md:w-auto">
                  View Collection
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

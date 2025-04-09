import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cart";
import { Star, StarHalf, Heart, Share2, Minus, Plus, ArrowLeft } from "lucide-react";
import { ProductWithCategory } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductDetailProps {
  slug: string;
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const addToCart = useCart((state) => state.addItem);
  
  const { data: product, isLoading, error } = useQuery<ProductWithCategory>({
    queryKey: [`/api/products/${slug}`],
  });
  
  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${quantity === 1 ? 'item' : 'items'} of ${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-amber-500 text-amber-500" size={20} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="fill-amber-500 text-amber-500" size={20} />);
    }
    
    return stars;
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Skeleton className="h-[500px] rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-36" />
              <Skeleton className="h-12 w-48" />
            </div>
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-serif font-bold text-primary mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/products">
          <Button>Browse All Products</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products">
        <a className="inline-flex items-center text-primary hover:text-green-700 mb-6">
          <ArrowLeft size={16} className="mr-2" /> Back to Products
        </a>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div>
          {product.category && (
            <Link href={`/products?category=${product.category.slug}`}>
              <a className="text-green-700 hover:text-green-900 font-medium text-sm uppercase tracking-wider">
                {product.category.name}
              </a>
            </Link>
          )}
          
          <h1 className="text-3xl font-serif font-bold text-primary mt-2 mb-3">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {renderRatingStars(product.rating)}
            </div>
            <span className="text-gray-600">({product.reviewCount} reviews)</span>
          </div>
          
          <div className="flex items-center mb-6">
            <p className="text-2xl font-medium text-primary">₹{product.price.toFixed(0)}</p>
            {product.discountPrice && (
              <p className="text-lg line-through text-gray-500 ml-3">₹{product.discountPrice.toFixed(0)}</p>
            )}
            {product.discountPrice && (
              <span className="ml-3 bg-amber-100 text-amber-800 text-sm font-medium px-2 py-1 rounded">
                Save {Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)}%
              </span>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {product.weight && (
            <p className="text-gray-600 mb-6">
              <span className="font-medium">Weight:</span> {product.weight}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="flex items-center border rounded-full overflow-hidden">
              <button 
                onClick={decreaseQuantity}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <Button
              onClick={handleAddToCart}
              className="bg-green-700 hover:bg-green-900 text-white px-8 py-6 rounded-full flex-grow sm:flex-grow-0"
            >
              Add to Cart
            </Button>
            
            <Button
              variant="outline"
              className="rounded-full p-3"
              onClick={() => toast({ title: "Feature coming soon" })}
            >
              <Heart size={20} />
            </Button>
            
            <Button
              variant="outline"
              className="rounded-full p-3"
              onClick={() => toast({ title: "Feature coming soon" })}
            >
              <Share2 size={20} />
            </Button>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <span className="font-medium">Free shipping</span> on orders over ₹1000
            </div>
            <div className="flex items-center gap-2 text-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              <span className="font-medium">100% authentic</span> handpicked spices
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

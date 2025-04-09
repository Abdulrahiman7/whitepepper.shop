import { Link } from "wouter";
import { Heart, Star, StarHalf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cart";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const addToCart = useCart((state) => state.addItem);
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addToCart(product);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Feature coming soon",
      description: "Wishlist functionality will be available soon!",
    });
  };
  
  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-amber-500 text-amber-500" size={14} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="fill-amber-500 text-amber-500" size={14} />);
    }
    
    return stars;
  };
  
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden product-card shadow-md cursor-pointer transition-all hover:shadow-lg">
        <div className="relative overflow-hidden h-64">
          {product.isBestSeller && (
            <span className="absolute top-3 left-3 bg-amber-500 text-primary px-3 py-1 text-xs font-semibold rounded-full z-10">
              BESTSELLER
            </span>
          )}
          {product.isNewProduct && (
            <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-semibold rounded-full z-10">
              NEW
            </span>
          )}
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <button 
            onClick={handleToggleFavorite}
            className="absolute bottom-3 right-3 bg-white text-primary rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-white transition duration-300 shadow-md"
          >
            <Heart size={18} />
          </button>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg text-primary">{product.name}</h3>
            <div className="flex items-center text-amber-500">
              {renderRatingStars()}
              <span className="text-primary text-xs ml-1">({product.reviewCount})</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-primary">
              ₹{product.price.toFixed(0)}
              {product.discountPrice && (
                <span className="text-sm line-through text-gray-500 ml-2">
                  ₹{product.discountPrice.toFixed(0)}
                </span>
              )}
            </p>
            <Button
              onClick={handleAddToCart}
              className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded-full transition text-sm flex items-center gap-2"
            >
              <span className="text-xs">+</span> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { useParams } from "wouter";
import ProductDetail from "@/components/product/ProductDetail";
import { useQuery } from "@tanstack/react-query";
import { ProductWithCategory } from "@shared/schema";
import { Helmet } from "react-helmet";

export default function ProductDetailPage() {
  const { slug } = useParams();
  
  const { data: product, isLoading } = useQuery<ProductWithCategory>({
    queryKey: [`/api/products/${slug}`],
  });
  
  return (
    <>
      <Helmet>
        <title>{!isLoading && product ? `${product.name} | WhitPepper Shop` : 'Product Details | WhitPepper Shop'}</title>
        <meta 
          name="description" 
          content={!isLoading && product ? product.description || "Premium spice from Coorg, Karnataka." : "Explore our premium spices from Coorg, Karnataka."} 
        />
      </Helmet>
      
      <ProductDetail slug={slug} />
    </>
  );
}

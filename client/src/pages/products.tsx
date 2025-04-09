import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Filter, SlidersHorizontal } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import { Category } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Helmet } from "react-helmet";

export default function Products() {
  const [location] = useLocation();
  const [title, setTitle] = useState("All Products");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Extract query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const categorySlug = params.get('category');
    const search = params.get('search');
    
    if (search) {
      setSearchQuery(search);
      setTitle(`Search Results: "${search}"`);
    } else {
      setSearchQuery(undefined);
    }
    
    if (categorySlug && categories) {
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        setCategoryId(category.id);
        setTitle(category.name);
      } else {
        setCategoryId(undefined);
        if (!search) setTitle("All Products");
      }
    } else if (!search) {
      setCategoryId(undefined);
      setTitle("All Products");
    }
  }, [location, categories]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <>
      <Helmet>
        <title>{title} | WhitePepper Shop</title>
        <meta name="description" content="Browse our collection of premium spices from Coorg, Karnataka." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">{title}</h1>
          <p className="text-gray-600">
            Explore our premium quality spices sourced directly from the hills of Coorg
          </p>
        </div>
        
        {/* Mobile Filters Button */}
        <div className="lg:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <SlidersHorizontal size={16} />
                <span>Filter Products</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="font-serif text-primary">Product Categories</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="/products"
                      className={`block px-3 py-2 rounded-md ${!categoryId ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      All Products
                    </a>
                  </li>
                  {categories?.map(category => (
                    <li key={category.id}>
                      <a 
                        href={`/products?category=${category.slug}`}
                        className={`block px-3 py-2 rounded-md ${categoryId === category.id ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-40">
              <h2 className="text-lg font-serif font-semibold text-primary mb-4 flex items-center">
                <Filter size={18} className="mr-2" />
                Categories
              </h2>
              
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/products"
                    className={`block px-3 py-2 rounded-md transition ${!categoryId ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    All Products
                  </a>
                </li>
                {categories?.map(category => (
                  <li key={category.id}>
                    <a 
                      href={`/products?category=${category.slug}`}
                      className={`block px-3 py-2 rounded-md transition ${categoryId === category.id ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-grow">
            <ProductGrid categoryId={categoryId} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </>
  );
}

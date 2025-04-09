import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cart";
import { useQuery } from "@tanstack/react-query";
import { 
  Search,
  User,
  ShoppingBag,
  Menu,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category } from "@shared/schema";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLocation] = useLocation();
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  const cartItems = useCart((state) => state.getTotalItems());
  const openCart = useCart((state) => state.openCart);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const isCategoryActive = (slug: string) => {
    return currentLocation === `/products?category=${slug}`;
  };
  
  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      {/* Announcement Bar */}
      <div className="bg-primary text-white text-center py-2 text-sm">
        <p>Free shipping on orders over ₹1000 | Use code FIRSTORDER for 10% off</p>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-primary">
              <span className="text-amber-500">White</span>Pepper<span className="text-xs font-sans align-top">.shop</span>
            </h1>
          </Link>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden absolute right-4 top-16 text-primary"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Search Bar - Desktop */}
        <div className="hidden md:block mx-4 flex-grow max-w-md">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for spices..."
              className="w-full px-4 py-2 border rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              className="absolute right-0 top-0 bottom-0 px-4 text-primary"
            >
              <Search size={18} />
            </Button>
          </form>
        </div>

        {/* Navigation Links */}
        <nav className={`${mobileMenuOpen ? 'flex flex-col w-full md:w-auto' : 'hidden md:flex'} items-center space-y-2 md:space-y-0 space-x-0 md:space-x-4`}>
          <Link href="/products" className="py-2 px-3 text-primary hover:text-green-700 transition duration-200">
            Shop
          </Link>
          <Link href="/about" className="py-2 px-3 text-primary hover:text-green-700 transition duration-200">
            About
          </Link>
          <Link href="/contact" className="py-2 px-3 text-primary hover:text-green-700 transition duration-200">
            Contact
          </Link>
          <button 
            onClick={openCart}
            className="py-2 px-3 relative text-primary hover:text-green-700 transition duration-200"
          >
            <ShoppingBag className="h-6 w-6" />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </button>
          <Link href="/account" className="py-2 px-3 text-primary hover:text-green-700 transition duration-200">
            <User className="h-6 w-6" />
          </Link>
        </nav>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search for spices..."
            className="w-full px-4 py-2 border rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            className="absolute right-0 top-0 bottom-0 px-4 text-primary"
          >
            <Search size={18} />
          </Button>
        </form>
      </div>

      {/* Category Navigation */}
      <div className="border-t border-gray-200 overflow-x-auto whitespace-nowrap py-2 px-4 bg-white">
        <div className="container mx-auto flex space-x-6">
          <Link
            href="/products"
            className={`text-sm font-medium px-1 py-1 text-primary ${
              currentLocation === "/products" ? "border-b-2 border-amber-500" : "hover:border-b-2 hover:border-amber-500 transition-all"
            }`}
          >
            All Spices
          </Link>
          
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className={`text-sm font-medium px-1 py-1 text-primary ${
                isCategoryActive(category.slug) ? "border-b-2 border-amber-500" : "hover:border-b-2 hover:border-amber-500 transition-all"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

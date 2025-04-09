import { useCart } from "@/lib/cart";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem from "./CartItem";
import { Link } from "wouter";

export default function CartSidebar() {
  const { 
    items, 
    isOpen, 
    closeCart,
    getTotalItems,
    getTotalPrice,
    clearCart,
    isLoading 
  } = useCart();
  
  // Function to handle checkout
  const handleCheckout = () => {
    closeCart();
  };
  
  return (
    <div 
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 z-50`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-serif font-bold text-primary">
            Your Cart ({getTotalItems()})
          </h3>
          <button 
            onClick={closeCart}
            className="text-gray-500 hover:text-primary transition-colors"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {isLoading && (
            <div className="py-20 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading your cart...</p>
            </div>
          )}
          
          {!isLoading && items.length === 0 && (
            <div className="py-20 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h4 className="mt-4 text-lg font-medium text-primary">Your cart is empty</h4>
              <p className="mt-2 text-gray-600">Looks like you haven't added any spices to your cart yet.</p>
              <Button 
                onClick={closeCart}
                className="mt-4 bg-green-700 hover:bg-green-900 text-white"
              >
                Continue Shopping
              </Button>
            </div>
          )}
          
          {!isLoading && items.length > 0 && (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} onClose={closeCart} />
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="mb-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-primary">₹{getTotalPrice().toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-primary">
                  {getTotalPrice() >= 1000 ? 'Free' : '₹100'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-semibold text-primary">Total</span>
                <span className="font-semibold text-primary">
                  ₹{(getTotalPrice() + (getTotalPrice() >= 1000 ? 0 : 100)).toFixed(0)}
                </span>
              </div>
            </div>
            
            <Link href="/checkout" onClick={handleCheckout}>
              <Button className="w-full bg-green-700 hover:bg-green-900 text-white font-medium px-6 py-3 rounded-full transition mb-3">
                Proceed to Checkout
              </Button>
            </Link>
            
            <Button 
              variant="outline"
              className="w-full text-primary hover:text-green-700 transition"
              onClick={closeCart}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

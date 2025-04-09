import { useEffect } from "react";
import { Link } from "wouter";
import { useCart } from "@/lib/cart";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { items, getTotalItems, getTotalPrice, clearCart, isLoading } = useCart();
  
  // Calculate totals
  const subtotal = getTotalPrice();
  const shipping = subtotal >= 1000 ? 0 : 100;
  const total = subtotal + shipping;
  
  // Empty cart view
  if (!isLoading && items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Cart | WhitPepper Shop</title>
          <meta name="description" content="View your shopping cart at WhitPepper Shop." />
        </Helmet>
        
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Your Cart</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-primary mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any spices to your cart yet.</p>
            <Link href="/products">
              <Button className="bg-green-700 hover:bg-green-900 text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Cart ({getTotalItems()}) | WhitPepper Shop</title>
        <meta name="description" content="View your shopping cart at WhitPepper Shop." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-serif font-bold text-primary mb-8">Shopping Cart</h1>
        
        {isLoading ? (
          <div className="bg-white p-8 rounded-lg shadow-md flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center pb-4 border-b">
                  <h2 className="text-lg font-medium">Cart Items ({getTotalItems()})</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => clearCart()}
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    Clear Cart
                  </Button>
                </div>
                
                <div className="divide-y">
                  {items.map(item => (
                    <div className="py-4" key={item.id}>
                      <CartItem item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-40">
                <h2 className="text-lg font-medium text-primary border-b pb-4 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `₹${shipping.toFixed(0)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-sm text-green-700 italic">
                      Add ₹{(1000 - subtotal).toFixed(0)} more for free shipping
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t text-lg font-medium">
                    <span className="text-primary">Total</span>
                    <span className="text-primary">₹{total.toFixed(0)}</span>
                  </div>
                </div>
                
                <Link href="/checkout">
                  <Button className="w-full bg-green-700 hover:bg-green-900 text-white flex items-center justify-center gap-2 py-6">
                    Proceed to Checkout 
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                
                <div className="mt-6 space-y-2">
                  <div className="flex items-center text-green-700 text-sm gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <span>Free shipping on orders over ₹1000</span>
                  </div>
                  <div className="flex items-center text-green-700 text-sm gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                    <span>100% authentic handpicked spices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

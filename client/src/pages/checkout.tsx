import { useEffect } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/lib/cart";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const [location, setLocation] = useLocation();
  const { items, getTotalItems } = useCart();
  
  const isSuccessPage = location.includes('/checkout/success');
  const orderId = new URLSearchParams(location.split('?')[1]).get('order');
  
  // Redirect to cart if cart is empty and not on success page
  useEffect(() => {
    if (items.length === 0 && !isSuccessPage) {
      setLocation('/cart');
    }
  }, [items, isSuccessPage, setLocation]);
  
  if (isSuccessPage) {
    return (
      <>
        <Helmet>
          <title>Order Confirmation | WhitPepper Shop</title>
          <meta name="description" content="Your order has been successfully placed." />
        </Helmet>
        
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check size={32} className="text-green-700" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-primary mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. Your order #{orderId} has been successfully placed and is being processed.
            </p>
            <p className="text-gray-600 mb-6">
              You will receive an email confirmation shortly with details of your purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-green-700 hover:bg-green-900 text-white px-6">
                  Back to Home
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="border-green-700 text-green-700 px-6">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Checkout | WhitPepper Shop</title>
        <meta name="description" content="Complete your purchase of premium spices from Coorg." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link href="/cart">
            <a className="inline-flex items-center text-primary hover:text-green-700 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Back to Cart
            </a>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-primary mt-4">Checkout</h1>
        </div>
        
        <CheckoutForm />
      </div>
    </>
  );
}

// Helper component for Link
function Link({ href, children }: { href: string, children: React.ReactNode }) {
  const [_, setLocation] = useLocation();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLocation(href);
  };
  
  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}

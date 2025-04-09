import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import RazorpayPayment from "./RazorpayPayment";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

// Form schema
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(10, { message: "Please enter your complete address" }),
  city: z.string().min(2, { message: "Please enter your city" }),
  state: z.string().min(2, { message: "Please enter your state" }),
  pincode: z.string().min(6, { message: "Please enter a valid PIN code" }),
  paymentMethod: z.enum(["cod", "card", "upi"]),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const { items, getTotalPrice, clearCart, sessionId } = useCart();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  
  // Default values for the form
  const defaultValues: Partial<FormValues> = {
    paymentMethod: "card",
    notes: "",
  };
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  // Calculate order totals
  const subtotal = getTotalPrice();
  const shipping = subtotal >= 1000 ? 0 : 100;
  const total = subtotal + shipping;
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare order items
      const orderItems = items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.discountPrice || item.product.price,
        totalPrice: (item.product.discountPrice || item.product.price) * item.quantity,
      }));
      
      // Prepare order data
      const orderData = {
        totalAmount: total,
        status: "pending",
        shippingAddress: `${data.address}, ${data.city}, ${data.state} - ${data.pincode}`,
        paymentMethod: data.paymentMethod,
        items: orderItems,
        sessionId,
      };
      
      // Submit order
      const response = await apiRequest('POST', '/api/orders', orderData);
      const order = await response.json();
      
      // For cash on delivery, proceed directly to success page
      if (data.paymentMethod === "cod") {
        // Clear cart after successful order
        await clearCart();
        
        // Show success message
        toast({
          title: "Order placed successfully!",
          description: `Your order #${order.id} has been placed.`,
        });
        
        // Redirect to success page
        setLocation(`/checkout/success?order=${order.id}`);
      } else {
        // For online payments (card/UPI), initialize Razorpay
        setCreatedOrder(order);
        setShowRazorpay(true);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handler for successful payment
  const handlePaymentSuccess = async () => {
    if (createdOrder) {
      // Clear cart after successful payment
      await clearCart();
      
      // Show success message
      toast({
        title: "Payment Successful!",
        description: `Your order #${createdOrder.id} has been placed and payment received.`,
      });
      
      // Redirect to success page
      setLocation(`/checkout/success?order=${createdOrder.id}`);
    }
  };
  
  // Handler for payment failure
  const handlePaymentError = (error: any) => {
    console.error("Payment error:", error);
    toast({
      title: "Payment Failed",
      description: "We couldn't process your payment. Please try again or choose another payment method.",
      variant: "destructive",
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {showRazorpay && createdOrder ? (
        <div className="lg:col-span-3">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Complete Your Payment</h2>
            <p className="text-gray-600 mb-8">
              Please complete your payment to confirm your order.
            </p>
            
            <RazorpayPayment
              amount={total}
              orderId={createdOrder.id}
              customerName={form.getValues('fullName')}
              customerEmail={form.getValues('email')}
              customerPhone={form.getValues('phone')}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
            
            <button 
              onClick={() => setShowRazorpay(false)}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              Back to Order Details
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-serif font-semibold text-primary mb-4">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-serif font-semibold text-primary mb-4">Shipping Address</h3>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter your complete address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PIN Code</FormLabel>
                            <FormControl>
                              <Input placeholder="PIN Code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-serif font-semibold text-primary mb-4">Payment Method</h3>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="card" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                <div className="flex items-center">
                                  <span className="mr-2">Credit/Debit Card</span>
                                  <svg className="h-6 w-10 fill-current text-gray-600" viewBox="0 0 576 512">
                                    <path d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43 16-43-1.7 3.7-3.6 7.1-5.3 10.8l-13.7 34.2h34.2zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.9 4 29.5 9.8 42.2 17.1l35.8 135h42.5zm129.1-4.4c7.6-3.3 15.5-8.1 19.4-13.7l-4.4-22.2c-5.3 7.1-17.4 14.8-35.5 14.8-23.6 0-40-12.5-40-33 0-28.3 22.5-32.8 42.7-32.8 6.8 0 13.1.5 19.8 1.8V235c0-14.1-9.3-19.7-24.8-19.7a86.35 86.35 0 0 0-33.5 6.7l-4.7-28.1c4.4-1.7 19.9-8 42.8-8 32.7 0 57.5 8.1 57.5 42.1v89l.8 4.9zM512 176.3c-.6-.6-54.5-.7-54.5-.7l-52.8 199.4h40.5l6.3-26.1h45.3l4.7 26.1H512l-33.4-198.7z" />
                                  </svg>
                                  <svg className="h-6 w-10 fill-current text-gray-600 ml-1" viewBox="0 0 576 512">
                                    <path d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7 0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2 5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.8 0 11.2-4.9 11.2-11.7.1-6.5-4.3-11.7-11.2-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8.3c-6.8 0-10.9 5.2-10.9 11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7 0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3.3.5.3 1.1 0 .3-.3.5-.3 1.1-.3.3-.3.5-.5.8-.3.3-.5.5-1.1.5-.3.3-.5.3-1.1.3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8.3-1.1 0-.5.3-.8.5-.8.3-.3.5-.5.8-.5.5-.3.8-.3 1.1-.3.5 0 .8 0 1.1.3.5.3.8.3.8.5.5.3.5.5.5.8zm-2.2 1.4c.5 0 .5-.3.8-.3.3-.3.3-.5.3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V413h.5l1.1 1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zm-142.2 76.3v-13.6c0-8.9 7.2-16.1 16.1-16.1h6.7c8.9 0 16.1 7.2 16.1 16.1v13.6c0 8.9-7.2 16.1-16.1 16.1h-6.7c-8.9 0-16.1-7.2-16.1-16.1zm185.9 0v-13.6c0-8.9 7.2-16.1 16.1-16.1h6.7c8.9 0 16.1 7.2 16.1 16.1v13.6c0 8.9-7.2 16.1-16.1 16.1H348c-8.9 0-16.1-7.2-16.1-16.1zm101.2 0v-13.6c0-8.9 7.2-16.1 16.1-16.1h6.7c8.9 0 16.1 7.2 16.1 16.1v13.6c0 8.9-7.2 16.1-16.1 16.1h-6.7c-8.9 0-16.1-7.2-16.1-16.1zM138.3 149.1c0-13.9 7.7-26.5 19.9-33l-.1-.1c15.2-8.3 20.2-27.1 10.9-42.5l-.9-1.7c-9.6-16.4-29.5-21.8-45.7-11.8l-.8.5c-16.1 9.7-21.2 30.5-10.6 46.6l.5.8c8.3 15.1 8.3 33.4 0 48.5l-.5.8c-10.6 16.1-5.6 36.9 10.6 46.6l.8.5c16.2 10 36 4.6 45.7-11.8l.9-1.7c9.3-15.4 4.2-34.2-10.9-42.5l.1-.1c-12.2-6.5-19.9-19.2-19.9-33zm160 80c0-12.6 10.2-22.8 22.9-22.8 12.6 0 22.8 10.2 22.8 22.8v25.7c0 12.6-10.2 22.8-22.8 22.8-12.7 0-22.9-10.2-22.9-22.8v-25.7z" />
                                  </svg>
                                </div>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="upi" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                <div className="flex items-center">
                                  <span className="mr-2">UPI</span>
                                  <svg className="h-6 w-6 fill-current text-gray-600" viewBox="0 0 448 512">
                                    <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" />
                                  </svg>
                                </div>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="cod" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                <div className="flex items-center">
                                  <span className="mr-2">Cash on Delivery</span>
                                  <svg className="h-6 w-6 fill-current text-gray-600" viewBox="0 0 576 512">
                                    <path d="M528 64h-24.8c-91.9 0-180 19.1-261.2 57.4L208.9 128 136 128C80.6 128 36 171.7 34 227L33.8 304H240c12.6 0 24.8 3.4 35.5 9.7l89.4 53.6c29.3 17.6 65.6-4.7 58.6-38.3L385.7 176h8.3c9.9 0 18.8 4.6 24.4 12 8.7 11.3 10.6 26.8 4.9 40L370.7 348c-8.1 19 7.2 38 25 38h42.3c28.6 0 53.7-18.6 61.5-46.3L517 274.8c19-67.2 7.6-141.8-36.4-196.7-11.7-14.5-26.1-23.9-43.7-28.1L432 48l-32-48h-57.7c-21.5 0-43 4.8-62.2 14L220.2 48C200.9 58.3 176 58.3 157.8 48L100.7 14C81.4 4.8 60 0 38.4 0H8.7L40 48h48c8.8 0 16.7 3.4 23 8.6l55.2 45.8c-35.6 11.8-68.8 27.3-96.9 46.4l-71.5-20.9C-8.7 122-8.7 154.6 13.5 160.9l42.8 12.3c-48.5 44-74.3 99-74.3 155.2 0 101.7 67.8 183.6 169.2 183.6h224.2c17.4 0 34.6-2.7 51.1-8V392h-32.2c-35.8 0-63.4-34.9-52.3-69 9.3-28.6 34.5-48.5 64-48.5h17.9c37.7 0 62-32.7 51.4-66.9l-16.1-41c-7.8-19.9 10.4-38.8 30.3-31.1l8.7 3.1c27.3 9.7 47 34.5 47 63.8 0 36.7-17.4 64.1-43.2 79.8V504c38-16.8 68.8-51.5 78.9-95.2l23.7-103c.7-3.2 1.1-6.7 1.1-9.8 0-27.8-24.6-56-64-56zm-59.4 89.8c16 0 24.1 20.8 12.4 32.5l-57.3 57.4c-6.2 6.2-16.3 6.2-22.6 0l-36.4-36.4c-6.2-6.2-6.2-16.3 0-22.6 6.2-6.2 16.3-6.2 22.6 0L416 214.3l40.6-40.5c3-3 6.9-4.5 11.3-4.5h.7z" />
                                  </svg>
                                </div>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-serif font-semibold text-primary mb-4">Order Notes</h3>
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any special instructions for delivery or packaging" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-100 w-12 h-12 flex items-center justify-center">
                        <span className="text-lg font-medium">{item.quantity}x</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">
                          ₹{(item.product.discountPrice || item.product.price).toFixed(0)} each
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₹{((item.product.discountPrice || item.product.price) * item.quantity).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">₹{subtotal.toFixed(0)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(0)}`}</p>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                    <p>Total</p>
                    <p>₹{total.toFixed(0)}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-2">
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
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
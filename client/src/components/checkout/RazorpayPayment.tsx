import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentProps {
  amount: number;
  orderId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: () => void;
  onError: (error: any) => void;
}

export default function RazorpayPayment({
  amount,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onError
}: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [razorpayOrderId, setRazorpayOrderId] = useState<string | null>(null);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createRazorpayOrder = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/create-razorpay-order', {
        amount,
        orderId,
        currency: 'INR',
        receipt: `receipt_order_${orderId}`
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment order');
      }

      const orderData = await response.json();
      setRazorpayOrderId(orderData.id);
      return orderData;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      onError(error);
      toast({
        title: 'Payment Initialization Failed',
        description: 'Unable to initialize payment. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    const orderData = await createRazorpayOrder();
    if (!orderData) return;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || '', // This will be replaced with your actual key when provided
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'WhitePepper Shop',
      description: `Order #${orderId} - Premium Spices from Coorg`,
      order_id: orderData.id,
      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone,
      },
      theme: {
        color: '#365314',
      },
      handler: function (response: any) {
        handlePaymentSuccess(response);
      },
      modal: {
        ondismiss: function () {
          toast({
            title: 'Payment Cancelled',
            description: 'You cancelled the payment process. Your order is not confirmed yet.',
          });
        },
      },
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      onError(error);
      toast({
        title: 'Payment Failed',
        description: 'Unable to process payment. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const handlePaymentSuccess = async (response: any) => {
    try {
      // Verify payment with backend
      const verifyResponse = await apiRequest('POST', '/api/verify-payment', {
        ...response,
        orderId,
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.error || 'Payment verification failed');
      }

      const result = await verifyResponse.json();
      if (result.success) {
        toast({
          title: 'Payment Successful',
          description: 'Your payment has been processed successfully.',
        });
        onSuccess();
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      onError(error);
      toast({
        title: 'Payment Verification Failed',
        description: 'We couldn\'t verify your payment. Please contact support.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      onClick={handlePayment}
      className="w-full bg-green-700 hover:bg-green-900 text-white font-medium py-6"
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : 'Pay with Razorpay'}
    </Button>
  );
}
import { useCart } from "@/lib/cart";
import { CartItemWithProduct } from "@shared/schema";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

interface CartItemProps {
  item: CartItemWithProduct;
  onClose?: () => void;
}

export default function CartItem({ item, onClose }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  
  const handleIncreaseQuantity = async () => {
    await updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecreaseQuantity = async () => {
    if (item.quantity > 1) {
      await updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleRemove = async () => {
    await removeItem(item.id);
  };

  // Calculate the item price (use discounted price if available)
  const price = item.product.discountPrice || item.product.price;
  const totalPrice = price * item.quantity;
  
  return (
    <div className="flex items-center gap-4 pb-4 border-b">
      <Link href={`/products/${item.product.slug}`} onClick={onClose}>
        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 cursor-pointer">
          <img 
            src={item.product.imageUrl} 
            alt={item.product.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="flex-grow">
        <Link href={`/products/${item.product.slug}`} onClick={onClose}>
          <h4 className="text-primary font-medium cursor-pointer hover:text-green-700 transition-colors">
            {item.product.name}
          </h4>
        </Link>
        <p className="text-sm text-gray-600">{item.product.weight}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border rounded-full overflow-hidden">
            <button 
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              onClick={handleDecreaseQuantity}
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="px-2 py-1">{item.quantity}</span>
            <button 
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              onClick={handleIncreaseQuantity}
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="font-medium text-primary">₹{totalPrice.toFixed(0)}</span>
        </div>
      </div>
      <button 
        className="text-gray-400 hover:text-red-500 transition-colors"
        onClick={handleRemove}
        aria-label="Remove item"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

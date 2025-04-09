import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { useEffect } from "react";
import { useCart } from "./lib/cart";

// Initialize the cart when the app loads
function AppWithCartInit() {
  const initializeCart = useCart((state) => state.initializeCart);
  
  useEffect(() => {
    initializeCart();
  }, [initializeCart]);
  
  return <App />;
}

createRoot(document.getElementById("root")!).render(<AppWithCartInit />);

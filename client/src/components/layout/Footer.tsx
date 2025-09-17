import { Link } from "wouter";
import { 
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Clock
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-6">
              <span className="text-amber-500">Whit</span>Pepper<span className="text-xs font-sans align-top">.shop</span>
            </h3>
            <p className="text-white/80 mb-6">Premium spices sourced directly from the hills of Coorg, Karnataka. Bringing authentic flavors to your kitchen since 2018.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-amber-500 transition duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-amber-500 transition duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-amber-500 transition duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-amber-500 transition duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/80 hover:text-amber-500 transition duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-amber-500 transition duration-200">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/products?category=gift-collections" className="text-white/80 hover:text-amber-500 transition duration-200">
                  Gift Collections
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-amber-500 transition duration-200">
                  Blog & Recipes
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-amber-500 transition duration-200">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>
          
          {/* Help & Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Help & Info</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-amber-500 transition duration-200">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-amber-500 transition duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-amber-500 transition duration-200">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-amber-500 transition duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-amber-500 transition duration-200">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 text-amber-500" />
                <span className="text-white/80">WhitePepper Estates, Madikeri, Coorg, Karnataka - 571201</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mt-1 mr-3 text-amber-500" />
                <span className="text-white/80">info@whitepepper.shop</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mt-1 mr-3 text-amber-500" />
                <span className="text-white/80">+91 6364147274</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mt-1 mr-3 text-amber-500" />
                <span className="text-white/80">Mon-Fri: 9AM to 6PM IST</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <span className="text-white/80 text-sm">We accept:</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6 w-10 fill-white">
              <path d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43 16-43-1.7 3.7-3.6 7.1-5.3 10.8l-13.7 34.2h34.2zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.9 4 29.5 9.8 42.2 17.1l35.8 135h42.5zm129.1-4.4c7.6-3.3 15.5-8.1 19.4-13.7l-4.4-22.2c-5.3 7.1-17.4 14.8-35.5 14.8-23.6 0-40-12.5-40-33 0-28.3 22.5-32.8 42.7-32.8 6.8 0 13.1.5 19.8 1.8V235c0-14.1-9.3-19.7-24.8-19.7a86.35 86.35 0 0 0-33.5 6.7l-4.7-28.1c4.4-1.7 19.9-8 42.8-8 32.7 0 57.5 8.1 57.5 42.1v89l.8 4.9zM512 176.3c-.6-.6-54.5-.7-54.5-.7l-52.8 199.4h40.5l6.3-26.1h45.3l4.7 26.1H512l-33.4-198.7z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6 w-10 fill-white">
              <path d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7 0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2 5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.8 0 11.2-4.9 11.2-11.7.1-6.5-4.3-11.7-11.2-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8.3c-6.8 0-10.9 5.2-10.9 11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7 0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3.3.5.3 1.1 0 .3-.3.5-.3 1.1-.3.3-.3.5-.5.8-.3.3-.5.5-1.1.5-.3.3-.5.3-1.1.3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8.3-1.1 0-.5.3-.8.5-.8.3-.3.5-.5.8-.5.5-.3.8-.3 1.1-.3.5 0 .8 0 1.1.3.5.3.8.3.8.5.5.3.5.5.5.8zm-2.2 1.4c.5 0 .5-.3.8-.3.3-.3.3-.5.3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V413h.5l1.1 1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zm-142.2 76.3v-13.6c0-8.9 7.2-16.1 16.1-16.1h6.7c8.9 0 16.1 7.2 16.1 16.1v13.6c0 8.9-7.2 16.1-16.1 16.1h-6.7c-8.9 0-16.1-7.2-16.1-16.1zm185.9 0v-13.6c0-8.9 7.2-16.1 16.1-16.1h6.7c8.9 0 16.1 7.2 16.1 16.1v13.6c0 8.9-7.2 16.1-16.1 16.1H348c-8.9 0-16.1-7.2-16.1-16.1zm101.2 0v-13.6c0-8.9 7.2-16.1 16.1-16.1h6.7c8.9 0 16.1 7.2 16.1 16.1v13.6c0 8.9-7.2 16.1-16.1 16.1h-6.7c-8.9 0-16.1-7.2-16.1-16.1zM138.3 149.1c0-13.9 7.7-26.5 19.9-33l-.1-.1c15.2-8.3 20.2-27.1 10.9-42.5l-.9-1.7c-9.6-16.4-29.5-21.8-45.7-11.8l-.8.5c-16.1 9.7-21.2 30.5-10.6 46.6l.5.8c8.3 15.1 8.3 33.4 0 48.5l-.5.8c-10.6 16.1-5.6 36.9 10.6 46.6l.8.5c16.2 10 36 4.6 45.7-11.8l.9-1.7c9.3-15.4 4.2-34.2-10.9-42.5l.1-.1c-12.2-6.5-19.9-19.2-19.9-33zm160 80c0-12.6 10.2-22.8 22.9-22.8 12.6 0 22.8 10.2 22.8 22.8v25.7c0 12.6-10.2 22.8-22.8 22.8-12.7 0-22.9-10.2-22.9-22.8v-25.7z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6 w-10 fill-white">
              <path d="M492.4 220.8c-8.9 0-18.7 6.7-18.7 22.7h36.7c0-16-9.3-22.7-18-22.7zM375 223.4c-8.2 0-13.3 2.9-17 7l.2 52.8c3.5 3.7 8.5 6.7 16.8 6.7 13.1 0 21.9-14.3 21.9-33.4 0-18.6-9-33.2-21.9-33.1zM528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM122.2 281.1c0 25.6-20.3 40.1-49.9 40.3-12.2 0-25.6-2.4-38.8-8.1v-33.9c12 6.4 27.1 11.3 38.9 11.3 7.9 0 13.6-2.1 13.6-8.7 0-17-54-10.6-54-49.9 0-25.2 19.2-40.2 48-40.2 11.8 0 23.5 1.8 35.3 6.5v33.4c-10.8-5.8-24.5-9.1-35.3-9.1-7.5 0-12.1 2.2-12.1 7.7 0 16 54.3 8.4 54.3 50.7zm68.8-56.6h-27V275c0 20.9 22.5 14.4 27 12.6v28.9c-4.7 2.6-13.3 4.7-24.9 4.7-21.1 0-36.9-15.5-36.9-36.5l.2-113.9 34.7-7.4v30.8H191zm74 2.4c-4.5-1.5-18.7-3.6-27.1 7.4v84.4h-35.5V194.2h30.7l2.2 10.5c8.3-15.3 24.9-12.2 29.6-10.5h.1zm44.1 91.8h-35.7V194.2h35.7zm0-142.9l-35.7 7.6v-28.9l35.7-7.6zm74.1 145.5c-12.4 0-20-5.3-25.1-9l-.1 40.2-35.5 7.5V194.2h31.3l1.8 8.8c4.9-4.5 13.9-11.1 27.8-11.1 24.9 0 48.4 22.5 48.4 63.8 0 45.1-23.2 65.5-48.6 65.6zm160.4-51.5h-69.5c1.6 16.6 13.8 21.5 27.6 21.5 14.1 0 25.2-3 34.9-7.9V312c-9.7 5.3-22.4 9.2-39.4 9.2-34.6 0-58.8-21.7-58.8-64.5 0-36.2 20.5-64.9 54.3-64.9 33.7 0 51.3 28.7 51.3 65.1 0 3.5-.3 10.9-.4 12.9z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-6 w-10 fill-white">
              <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6 w-10 fill-white">
              <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" />
            </svg>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} WhitePepper.shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import { Instagram } from "lucide-react";

export default function InstagramFeed() {
  const instagramPosts = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1532635239-506a8f0e05e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
  ];
  
  return (
    <section className="container mx-auto px-4 mb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-primary">Follow Us on Instagram</h2>
        <a href="https://www.instagram.com/whitepepper.shop" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-900 flex items-center gap-2 transition duration-200">
          @whitepepper.shop <Instagram size={18} />
        </a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {instagramPosts.map((post) => (
          <a 
            key={post.id}
            href="https://www.instagram.com/whitepepper.shop" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg group relative"
          >
            <img 
              src={post.imageUrl} 
              alt="Instagram post" 
              className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition duration-300 flex items-center justify-center">
              <Instagram className="text-white text-2xl opacity-0 group-hover:opacity-100 transition duration-300" size={24} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

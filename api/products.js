import { storage } from '../server/storage';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { category, search, featured, limit } = req.query;
      
      if (category) {
        const categoryId = parseInt(category);
        if (isNaN(categoryId)) {
          return res.status(400).json({ message: "Invalid category ID" });
        }
        const products = await storage.getProductsByCategory(categoryId);
        return res.json(products);
      }
      
      if (search) {
        const products = await storage.searchProducts(search);
        return res.json(products);
      }
      
      if (featured === 'true') {
        const limitNum = limit ? parseInt(limit) : undefined;
        const products = await storage.getFeaturedProducts(limitNum);
        return res.json(products);
      }
      
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

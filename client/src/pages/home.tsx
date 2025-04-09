import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StorySection from "@/components/home/StorySection";
import CollectionHighlight from "@/components/home/CollectionHighlight";
import TestimonialSection from "@/components/home/TestimonialSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import NewsletterSection from "@/components/home/NewsletterSection";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>WhitPepper Shop | Premium Spices from Coorg</title>
        <meta name="description" content="Experience the authentic flavors of handpicked premium spices from Karnataka's spice garden." />
      </Helmet>

      <HeroBanner />
      <FeaturedCategories />
      <FeaturedProducts />
      <StorySection />
      <CollectionHighlight />
      <TestimonialSection />
      <InstagramFeed />
      <NewsletterSection />
    </>
  );
}

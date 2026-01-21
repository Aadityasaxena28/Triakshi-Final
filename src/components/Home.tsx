import Marquee from "@/components/Marquee";
import ProductSlider from "@/components/ProductSlider";
import Testimonials from "@/components/Testimonials";
import TopSlider from "@/components/TopSlider";
import { useEffect, useState } from "react";
import Categories from "./Categories";
import Loader from "./General/Loader";
import NewArrivals from "./NewArrivals";
import NewCategories from "./NewCategories";
import FAQ from "./faq";
import SpiritualToolsUnder999 from "./SpiritualToolsUnder999";


const Home = () => {
  const [isLoading, setLoading] = useState(true);

  // 🔼 SCROLL TO TOP WHEN HOME ROUTE LOADS
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If the page already finished loading, skip the listener
    if (document.readyState === "complete") {
      setLoading(false);
      return;
    }

    const onLoad = () => setLoading(false);

    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={{ height: "100vh" }}>
          <Loader />
        </div>
      ) : (
        <>
          <TopSlider />
          <Marquee />
          <SpiritualToolsUnder999/>
          <ProductSlider />
          <NewArrivals />
          <NewCategories />
          <Categories />
          <Testimonials />
          <FAQ />
        </>
      )}
    </>
  );
}; 

export default Home;

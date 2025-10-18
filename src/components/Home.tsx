import Marquee from "@/components/Marquee";
import ProductSlider from "@/components/ProductSlider";
import Testimonials from "@/components/Testimonials";
import TopSlider from "@/components/TopSlider";
import { useEffect, useState } from "react";
import Categories from "./Categories";
import Loader from "./General/Loader";
import NewArrivals from "./NewArrivals";
import NewCategories from "./NewCategories";

const Home = () => {
  const [isLoading, setLoading] = useState(true);

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
          <ProductSlider />
          <NewArrivals/>
          
          <Categories/>
          <NewCategories />
          <Testimonials />
        </>
      )}
    </>
  );
};

export default Home;

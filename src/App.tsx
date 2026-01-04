import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Auth from "./components/Auth/Auth";
import ResetPasswordPage from "./components/Auth/ResetPassword";
import Blogs from "./components/Blogs";
import BooksPage from "./components/BooksPage";
import GemstoneReportGenerator from "./components/Calculator/GemstoneReportGenerator";
import HealthStoneCalculator from "./components/Calculator/HealthStoneCalculator";
import LifeCalPage from "./components/Calculator/LifeCalPage";
import LuckyStoneCalculator from "./components/Calculator/LuckyStoneCalculator";
import CheckoutPage from "./components/Checkout/checkout_page";
import ContactUs from "./components/ContactUs";
import GemstonesPage from "./components/gemstones-category-page";
import Home from "./components/Home";
import Mala_listing from "./components/Mala_listing";
import PaymentStatusPage from "./components/Payment-Status-Page";
import PaymentsRefund from "./components/Payments_refund";
import PrivacyPolicy from "./components/Privacypolicy";
import ProductDetailView from "./components/Product-view";
import ProfilePage from "./components/Profile/profile_page";
import { RequireAuth } from "./components/RequireAuth";
import RudrakshPage from "./components/rudraksha-category";
import ShippingPolicy from "./components/shippingpolicy";
import TermsConditions from "./components/Terms_conditions";
import TribhuvaniPage from "./components/tribhuvani-page";
import YantraPage from "./components/YantraPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();
 

const base = "";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* Router setup */}
      <BrowserRouter >
        <Routes>
        {/* --------------Authentication Pages -----------------*/}
        <Route path="/login" element={<Auth  state="login"/>} />
        <Route path="/signup" element={<Auth  state="signup"/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
        
          {/* --------------Main Pages-------------------- */}
          <Route path="/" element={<Index />} >
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="gemstones" element={<GemstonesPage/>}/>
          <Route path="gem-view/:id" element={<ProductDetailView category= "gemstone"/>}/>
          <Route path="rudraksha" element= {<RudrakshPage/>}/>
          <Route path="rudra-view/:id" element={<ProductDetailView category= "rudraksha"/>}/>
          <Route path="/books"element ={<BooksPage/>}/>
          <Route path="books-view/:id" element={<ProductDetailView category= "books"/>}/>
          <Route path="mala" element={<Mala_listing/>} />
          <Route path="bracelet" element={<Mala_listing/>} />
          <Route path ="/mala-brace-view/:id" element={<ProductDetailView category="mala"/>}/>
          <Route path="/payment-status/:id" element= {<PaymentStatusPage/>}/>
          <Route path="/tribhuvani" element ={<TribhuvaniPage/>}/>
          <Route path ="/tribhuvani-view/:id" element= {<ProductDetailView category="tribhuvani"/>}/>
          
          <Route path="/yantra" element={<YantraPage/>}/>
          <Route path ="/yantra-view/:id" element= {<ProductDetailView category="yantra"/>}/>
          {/*------------- Calculators------------------- */}
          <Route path = "/life-calculator" element={<LifeCalPage/>}/>
          <Route path="lucky-stone-calculator" element={<LuckyStoneCalculator />} />
          <Route path="health-stone-calculator" element={<HealthStoneCalculator />} />
          <Route path="report" element={<GemstoneReportGenerator />} />
 

          {/*------------- Policies & Terms and Info pages------------------- */}
          <Route path= "/about-us" element={<AboutUs/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
          <Route path ="/terms-&-conditions" element= {<TermsConditions/>}/>
          <Route path ="/refund-policy" element= {<PaymentsRefund/>}/>
          <Route path="contact-us" element={<ContactUs/>}/>
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/Shippingpolicy" element={<ShippingPolicy/>}/>
 

          {/* --------------Protected Pages-------------------- */}
          <Route element={<RequireAuth/>}>
          {/* For Cart Purchase Functionality */}
          <Route path="checkout" element= {<CheckoutPage/>}/>
          {/*For Buy now functionality*/}
          <Route path="checkout/:id" element= {<CheckoutPage/>}/>
          <Route path="/profile" element={<ProfilePage option="profile"/>}/>
          <Route path="/cart" element={<ProfilePage option="cart"/>}/>
          <Route path="/refer-earn" element={<ProfilePage option="refer"/>}/>
          </Route>

          
          </Route>

          {/*---------------- Handle any invalid URL -----------------*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

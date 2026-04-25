import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Offers from "./pages/Offers.tsx";
import Offer from "./pages/Offer.tsx";
import Merchant from "./pages/Merchant.tsx";
import Redeem from "./pages/Redeem.tsx";
import Privacy from "./pages/Privacy.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/offer-detail" element={<Offer />} />
          <Route path="/merchant" element={<Merchant />} />
          <Route path="/redeem" element={<Redeem />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

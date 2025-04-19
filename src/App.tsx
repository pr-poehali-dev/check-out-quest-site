import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "@/contexts/BookingContext";
import { AdminProvider } from "@/contexts/AdminContext";
import ThemeAwareSmokeEffect from "@/components/ThemeAwareSmokeEffect";
import CompanyLogo from "@/components/CompanyLogo";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import HomePage from "./pages/HomePage";
import DangerZone from "./pages/DangerZone";
import ArtifactQuest from "./pages/ArtifactQuest";
import TeaZone from "./pages/TeaZone";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <BookingProvider>
          <BrowserRouter>
            <BackgroundWrapper>
              <ThemeAwareSmokeEffect />
              <CompanyLogo />
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/danger-zone" element={<DangerZone />} />
                <Route path="/artifact-quest" element={<ArtifactQuest />} />
                <Route path="/tea-zone" element={<TeaZone />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BackgroundWrapper>
          </BrowserRouter>
        </BookingProvider>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
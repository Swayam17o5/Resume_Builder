import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { StatisticsProvider } from "@/contexts/StatisticsContext";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import ResumesPage from "./pages/ResumesPage";
import TemplatesPage from "./pages/TemplatesPage";
import ResumeEditorPage from "./pages/ResumeEditorPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import { useEffect } from "react";
import { initAuth } from "./services/authService";
import { initResumeService } from "./services/resumeService";
import AboutUsPage from "./pages/AboutUsPage";

const queryClient = new QueryClient();

// Add jsPDF to window object for PDF generation (if we were using it)
declare global {
  interface Window {
    jspdf: any;
  }
}

const App = () => {
  useEffect(() => {
    // Initialize services
    initAuth();
    initResumeService();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <StatisticsProvider>
            <ResumeProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/resumes" element={<ResumesPage />} />
                  <Route path="/templates" element={<TemplatesPage />} />
                  <Route path="/resume/:resumeId" element={<ResumeEditorPage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ResumeProvider>
          </StatisticsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

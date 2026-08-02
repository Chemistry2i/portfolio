import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Resume from "./pages/Resume";
import Auth from "./pages/Auth";
import AdminDownloads from "./pages/AdminDownloads";
import AdminRoles from "./pages/AdminRoles";
import PageTransition from "./components/PageTransition";
import GlobalCursorFX from "./components/GlobalCursorFX";
import PageLoader from "./components/PageLoader";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <PageTransition>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/project/:slug" element={<ProjectCaseStudy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/downloads" element={<AdminDownloads />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
};

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PageLoader />
        <GlobalCursorFX />


        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

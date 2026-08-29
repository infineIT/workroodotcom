import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import SiteLayout from '@/components/layout/SiteLayout';
import Home from "./pages/Home";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Solution from "./pages/Solution";
import EarlyAccess from "./pages/EarlyAccess";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/solutions/:audience" element={<Solution />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slugOrId" element={<BlogPost />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App

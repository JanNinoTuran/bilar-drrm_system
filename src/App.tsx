import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider } from "./context/AuthContext";

// Lazy load pages for better performance
const MapPage = lazy(() => import("./pages/map"));
const LoginPage = lazy(() => import("./pages/login"));
const SignUpPage = lazy(() => import("./pages/signup"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const EmergencyGuides = lazy(() => import("./pages/guides"));
const AlertSystem = lazy(() => import("./pages/alerts"));
const InventoryPage = lazy(() => import("./pages/inventory"));
const NewsPage = lazy(() => import("./pages/news"));
// News Management moved to dashboard

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/guides" element={<EmergencyGuides />} />
            <Route path="/alerts" element={<AlertSystem />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/news" element={<NewsPage />} />
            {/* News Management moved to dashboard */}

            {/* For Tempo routes */}
            {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;

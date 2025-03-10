import { lazy } from "react";

// Lazy load pages for better performance
const MapPage = lazy(() => import("./pages/map"));
const LoginPage = lazy(() => import("./pages/login"));
const SignUpPage = lazy(() => import("./pages/signup"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const EmergencyGuides = lazy(() => import("./pages/guides"));
const AlertSystem = lazy(() => import("./pages/alerts"));
const NewsPage = lazy(() => import("./pages/news"));

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/map",
    element: <MapPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/guides",
    element: <EmergencyGuides />,
  },
  {
    path: "/alerts",
    element: <AlertSystem />,
  },
  {
    path: "/news",
    element: <NewsPage />,
  },
];

export default routes;

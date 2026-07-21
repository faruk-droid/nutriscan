import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import SelectAnimal from "./pages/SelectAnimal";
import ScanScreen from "./pages/ScanScreen";
import ScanResult from "./pages/ScanResult";
import Database from "./pages/Database";
import Analytics from "./pages/Analytics";
import Recommendations from "./pages/Recommendations";
import DatabaseDetail from "./pages/DatabaseDetail";
import FeedFormulation from "./pages/FeedFormulation";
import AIAnalysisScreen from "./pages/AIAnalysisScreen";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/select-animal",
    Component: SelectAnimal,
  },
  {
    path: "/scan",
    Component: ScanScreen,
  },
  {
    path: "/scan-result",
    Component: ScanResult,
  },
  {
    path: "/database",
    Component: Database,
  },
  {
    path: "/analytics",
    Component: Analytics,
  },
  {
    path: "/recommendations",
    Component: Recommendations,
  },
  {
    
    path: "/database/:wasteId",
    Component: DatabaseDetail, 
  },
  {
    path: "/feed-formulation",
    Component: FeedFormulation,
  },
   {
    path: "/ai-analysis",
    Component: AIAnalysisScreen,
  },
]);
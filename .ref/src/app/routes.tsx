import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import SelectAnimal from "./pages/SelectAnimal";
import ScanScreen from "./pages/ScanScreen";
import ScanResult from "./pages/ScanResult";
import Database from "./pages/Database";
import Analytics from "./pages/Analytics";
import ARMode from "./pages/ARMode";
import Recommendations from "./pages/Recommendations";

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
    path: "/ar-mode",
    Component: ARMode,
  },
  {
    path: "/recommendations",
    Component: Recommendations,
  },
]);

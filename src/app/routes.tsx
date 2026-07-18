import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import SelectAnimal from "./pages/SelectAnimal";
import ScanScreen from "./pages/ScanScreen";
import ScanResult from "./pages/ScanResult";
import Database from "./pages/Database";
import Analytics from "./pages/Analytics";
import Recommendations from "./pages/Recommendations";
// 1. Ubah nama import menggunakan PascalCase (D besar) agar sinkron dengan di bawah
import DatabaseDetail from "./pages/DatabaseDetail";

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
]);
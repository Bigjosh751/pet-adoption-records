import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import "./styles/no-scrollbar.css";
import PetAdoption from "./pages/PetAdoption";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./pages/Dashboard";
import AvailablePets from "./pages/AvailablePets";
import ManagePetRecords from "./pages/ManagePetRecords";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/dashboard/pet-adoption-records"
            element={<PetAdoption />}
          />
          <Route
            path="/dashboard/manage-pets-records"
            element={<ManagePetRecords />}
          />
          <Route path="/dashboard/available-pets" element={<AvailablePets />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

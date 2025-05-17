import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import CustomerPage from "./pages/CustomerPage.tsx";
import Navbar from "./components/NavBar.tsx";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="p-6">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/dashboard/customer" element={<CustomerPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;

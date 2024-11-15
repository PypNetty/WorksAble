import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
// Layouts
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
// Public Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Candidate from "@/pages/Candidate";
import Recruiter from "@/pages/Recruiter";
// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import UserOnboarding from "@/pages/onboarding/UserOnboarding";
// Protected Pages
import Profile from "@/pages/Profile";
import ProfileSetup from "@/pages/onboarding/ProfileSetup"; // Nouveau import
import Matching from "@/pages/Matching";
import CandidateDashboard from "@/pages/dashboard/CandidateDashboard";
import RecruiterDashboard from "@/pages/dashboard/RecruiterDashboard";
// Other
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Pages publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/candidate" element={<Candidate />} />
              <Route path="/recruiter" element={<Recruiter />} />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Routes protégées */}
              <Route element={<ProtectedRoute />}>
                {/* Onboarding */}
                <Route path="/onboarding" element={<UserOnboarding />} />

                {/* Dashboards */}
                <Route path="/dashboard" element={<CandidateDashboard />} />
                <Route
                  path="/dashboard/recruiter"
                  element={<RecruiterDashboard />}
                />

                {/* Profile routes */}
                <Route path="/profile">
                  <Route index element={<Profile />} />
                  <Route path="setup" element={<ProfileSetup />} />
                </Route>

                {/* Autres pages protégées */}
                <Route path="/matching" element={<Matching />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
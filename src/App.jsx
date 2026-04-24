import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './pages/Home/Home';
import Login from './components/Auth/Login';
import UserSignup from './components/Auth/UserSignup';
import DriverSignup from './components/Auth/DriverSignup';
import DashboardLayout from './pages/DriverDashboard/DashboardLayout';
import Overview from './pages/DriverDashboard/Overview';
import UpcomingTrips from './pages/DriverDashboard/UpcomingTrips';
import TripHistory from './pages/DriverDashboard/TripHistory';
import ScheduleCalendar from './pages/DriverDashboard/ScheduleCalendar';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import VehiclesPage from './pages/Vehicles/VehiclesPage';
import DestinationsPage from './pages/Destinations/DestinationsPage';
import PricingPage from './pages/Pricing/PricingPage';
import ContactPage from './pages/Contact/ContactPage';
import AnnouncementsPage from './pages/Announcements/AnnouncementsPage';
import BlogsPage from './pages/Blog/BlogsPage';
import BlogDetails from './pages/Blog/BlogDetails';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminSignup from './pages/Admin/AdminSignup';
import AdminPanel from './pages/Admin/AdminPanel';
import { Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/driver-signup" element={<DriverSignup />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/portal-admin/login" element={<AdminLogin />} />
            <Route path="/portal-admin/signup" element={<AdminSignup />} />
            <Route path="/admin/login" element={<Navigate to="/portal-admin/login" replace />} />
            <Route path="/admin/signup" element={<Navigate to="/portal-admin/signup" replace />} />
            <Route
              path="/admin/panel"
              element={
                <ProtectedRoute requiredRole={['admin', 'super_admin']} redirectTo="/portal-admin/login">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="super_admin" redirectTo="/portal-admin/login">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route 
              path="/driver-dashboard" 
              element={
                <ProtectedRoute requiredRole="driver">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="upcoming" element={<UpcomingTrips />} />
              <Route path="history" element={<TripHistory />} />
              <Route path="calendar" element={<ScheduleCalendar />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

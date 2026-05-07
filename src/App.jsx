import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const Navbar = lazy(() => import('./components/Navigation/Navbar'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./components/Auth/Login'));
const UserSignup = lazy(() => import('./components/Auth/UserSignup'));
const DriverSignup = lazy(() => import('./components/Auth/DriverSignup'));
const DashboardLayout = lazy(() => import('./pages/DriverDashboard/DashboardLayout'));
const Overview = lazy(() => import('./pages/DriverDashboard/Overview'));
const UpcomingTrips = lazy(() => import('./pages/DriverDashboard/UpcomingTrips'));
const TripHistory = lazy(() => import('./pages/DriverDashboard/TripHistory'));
const ScheduleCalendar = lazy(() => import('./pages/DriverDashboard/ScheduleCalendar'));
const Notifications = lazy(() => import('./pages/DriverDashboard/Notifications'));
const Settings = lazy(() => import('./pages/DriverDashboard/Settings'));
const VehiclesPage = lazy(() => import('./pages/Vehicles/VehiclesPage'));
const DestinationsPage = lazy(() => import('./pages/Destinations/DestinationsPage'));
const PricingPage = lazy(() => import('./pages/Pricing/PricingPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const BlogsPage = lazy(() => import('./pages/Blog/BlogsPage'));
const BlogDetails = lazy(() => import('./pages/Blog/BlogDetails'));
const BookJourneyPage = lazy(() => import('./pages/Services/BookJourneyPage'));
const RentDriverWithVehiclePage = lazy(() => import('./pages/Services/RentDriverWithVehiclePage'));
const BookNowPage = lazy(() => import('./pages/Booking/BookNowPage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminSignup = lazy(() => import('./pages/Admin/AdminSignup'));
const AdminPanel = lazy(() => import('./pages/Admin/AdminPanel'));
const DestinationDetailsPage = lazy(() => import('./pages/Destinations/DestinationDetailsPage'));
const PrivacyPolicy = lazy(() => import('./pages/Privacy/PrivacyPolicy'));

const RouteLoader = () => (
  <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Loading...
  </div>
);

const AppShell = () => {
  const location = useLocation();
  const isDriverDashboard = location.pathname.startsWith('/driver-dashboard');

  return (
    <div className="app">
      {!isDriverDashboard && (
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
      )}
      <main>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/driver-signup" element={<DriverSignup />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:id" element={<DestinationDetailsPage />} />
            <Route path="/book-journey" element={<BookJourneyPage />} />
            <Route path="/rent-driver-with-vehicle" element={<RentDriverWithVehiclePage />} />
            <Route path="/book-now" element={<ProtectedRoute redirectTo="/login"><BookNowPage /></ProtectedRoute>} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
                <ProtectedRoute requiredRole={['admin', 'super_admin']} redirectTo="/portal-admin/login">
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
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      {!isDriverDashboard && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;

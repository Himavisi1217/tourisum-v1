import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './pages/Home/Home';
import Login from './components/Auth/Login';
import UserSignup from './components/Auth/UserSignup';
import DriverSignup from './components/Auth/DriverSignup';
import DashboardLayout from './pages/DriverDashboard/DashboardLayout';
import Overview from './pages/DriverDashboard/Overview';

import ScheduleCalendar from './pages/DriverDashboard/ScheduleCalendar';

import ProtectedRoute from './components/Auth/ProtectedRoute';

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
            
            <Route 
              path="/driver-dashboard" 
              element={
                <ProtectedRoute requiredRole="driver">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="upcoming" element={<div className="section"><h3>Upcoming Trips</h3></div>} />
              <Route path="history" element={<div className="section"><h3>Trip History</h3></div>} />
              <Route path="calendar" element={<ScheduleCalendar />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

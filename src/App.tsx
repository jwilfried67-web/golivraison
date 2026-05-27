import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/lib/store';
import { Layout } from '@/components/Layout';
import Home from '@/pages/Home';
import Order from '@/pages/Order';
import Tracking from '@/pages/Tracking';
import History from '@/pages/History';
import Profile from '@/pages/Profile';
import AdminDashboard from '@/pages/AdminDashboard';
import DriverDashboard from '@/pages/DriverDashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/driver" element={<DriverDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
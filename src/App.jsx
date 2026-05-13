// App.jsx — Root component with all context providers and router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/chatbot/Chatbot';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CampusEats from './pages/CampusEats';
import FoodDetail from './pages/FoodDetail';
import CampusRide from './pages/CampusRide';
import RideBooking from './pages/RideBooking';
import CampusMart from './pages/CampusMart';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    // ThemeProvider → AuthProvider → CartProvider → Router
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
          <BrowserRouter>
            <div className="app-shell">
              <Navbar />
              <main className="page-content">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Protected routes — require login */}
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/eats" element={<ProtectedRoute><CampusEats /></ProtectedRoute>} />
                  <Route path="/eats/:id" element={<ProtectedRoute><FoodDetail /></ProtectedRoute>} />
                  <Route path="/ride" element={<ProtectedRoute><CampusRide /></ProtectedRoute>} />
                  <Route path="/ride/:id" element={<ProtectedRoute><RideBooking /></ProtectedRoute>} />
                  <Route path="/mart" element={<ProtectedRoute><CampusMart /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                  {/* 404 catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              {/* AI Chatbot — floating widget, visible on all pages */}
              <Chatbot />
            </div>
          </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
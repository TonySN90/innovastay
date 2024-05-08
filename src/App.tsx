import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import User from "./pages/User";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Guests from "./pages/Guests";
import Checkin from "./pages/Checkin";
import CheckOut from "./pages/CheckOut";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import Schedular from "./pages/Schedular";

function App() {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="schedular" element={<Schedular />} />
            <Route path="checkin/:bookingId" element={<Checkin />} />
            <Route path="checkout/:bookingId" element={<CheckOut />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="guests" element={<Guests />} />
            <Route path="users" element={<User />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </DarkModeProvider>
    </BrowserRouter>
  );
}

export default App;

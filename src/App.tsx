/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Workbench from "./pages/Workbench";
import OrderDetails from "./pages/OrderDetails";
import Communication from "./pages/Communication";
import Profile from "./pages/Profile";
import Schedule from "./pages/Schedule";

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Workbench />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
  );
}

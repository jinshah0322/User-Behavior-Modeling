import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar.jsx"
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import ForgetPassword from "./components/ForgetPassword";
import ChangePassword from "./components/ChangePassword";
import "./app.css"
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./components/Profile/ProfilePage.jsx";
import ProfileAddress from "./components/Profile/ProfileAddress.jsx";
import PaymentVerification from "./components/Cart/PaymenrVerification.jsx";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const path = window.location.pathname;
const Product = lazy(() => import("./pages/Product"));
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {path !== "/login" && path !== "/register" && path !== "/forgotpassword" ?
           <NavBar />
         :""} 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgetPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/user" element={<ProfilePage />} />
          <Route path="/profile/address" element={<ProfileAddress />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order/paymentVerification" element={<PaymentVerification />} />
          
        </Routes>
  
      </Router>
    </Suspense>
  );
}

export default App;

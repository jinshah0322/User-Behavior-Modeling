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
import ProfileOrder from "./components/Profile/ProfileOrder.jsx";
import UserPrivateRoute from "./Layout/User/UserPrivateLayout.jsx"
import UserPublicRoute from "./Layout/User/UserPublicLayout.jsx"
import AdminPrivateRoute from "./Layout/Admin/AdminPrivateRoute.jsx"
import OrderById from "./app/Order/OrderById.jsx";
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
        {/* {path !== "/login" && path !== "/register" && path !== "/forgotpassword" ?
           <NavBar />
         :""}  */}
        <Routes>
          <Route path="/" exact element={<UserPublicRoute component={Home}/>} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgetPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/shop" exact element={<UserPublicRoute component={Shop}/>} />
          <Route path="/shop/:id" exact element={<UserPublicRoute component={Product}/>} />
          <Route path="/cart" exact element={<UserPrivateRoute component={Cart}/>} />
          <Route path="/profile" exact element={<UserPrivateRoute component={Profile}/>} />
          <Route path="/profile/user" exact element={<UserPrivateRoute component={ProfilePage}/>} />
          <Route path="/profile/address" exact element={<UserPrivateRoute component={ProfileAddress}/>} />
          <Route path="/profile/orders" exact element={<UserPrivateRoute component={ProfileOrder}/>} />
          <Route path="/profile/orders/:id" exact element={<UserPrivateRoute component={OrderById}/>} />
          <Route path="/dashboard" exact element={<AdminPrivateRoute component={Dashboard}/>} />          
        </Routes>
  
      </Router>
    </Suspense>
  );
}

export default App;

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
import LandingPage from "./components/LandingPage.js"
import OrderById from "./app/Order/OrderById.jsx";
import AllOrdersAdmin from "./app/features/adminorder/AllOrdersAdmin.js"
import OrderDetails from "./app/features/adminorder/OrderDetails.js"
import CategoryList from "./app/features/category/CategoryList.js"
import UserList from "./app/features/users/UserList.js"
import AddProduct from "./app/features/product/AddProduct.js"
import GetProduct from "./app/features/product/GetProduct.js"
import UpdateProduct from "./app/features/product/UpdateProduct.js"
import DeleteProduct from "./app/features/product/DeleteProduct.js"
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
// const path = window.location.pathname;
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
          <Route path="/shop" exact element={<UserPublicRoute component={Shop}/>} />
          <Route path="/shop/:id" exact element={<UserPublicRoute component={Product}/>} />
          <Route path="/cart" exact element={<UserPrivateRoute component={Cart}/>} />
          <Route path="/profile" exact element={<UserPrivateRoute component={Profile}/>} />
          <Route path="/profile/user" exact element={<UserPrivateRoute component={ProfilePage}/>} />
          <Route path="/profile/address" exact element={<UserPrivateRoute component={ProfileAddress}/>} />
          <Route path="/profile/orders" exact element={<UserPrivateRoute component={ProfileOrder}/>} />
          <Route path="/profile/changepassword" exact element={<UserPrivateRoute component={ChangePassword}/>} />
          <Route path="/profile/orders/:id" exact element={<UserPrivateRoute component={OrderById}/>} />
          <Route path="/dashboard/*" element={<AdminPrivateRoute component={Dashboard} />}>
            <Route path="landingpage" element={<AdminPrivateRoute component={LandingPage} />} />
            <Route path="category" element={<AdminPrivateRoute component={CategoryList} />} />
            <Route path="order" element={<AdminPrivateRoute component={AllOrdersAdmin} />} />
            <Route path="order/orderDetails/:id" element={<AdminPrivateRoute component={OrderDetails} />} />
            <Route path="user" element={<AdminPrivateRoute component={UserList} />} />
            <Route path="addProduct" element={<AdminPrivateRoute component={AddProduct} />} />
            <Route path="getProduct" element={<AdminPrivateRoute component={GetProduct} />} />
            <Route path="updateProduct" element={<AdminPrivateRoute component={UpdateProduct} />} />
            <Route path="deleteProduct" element={<AdminPrivateRoute component={DeleteProduct} />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;


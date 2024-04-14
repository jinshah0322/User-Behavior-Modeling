import React from "react";
import { Layout } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
const { Content } = Layout;

const UserPrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem("id");
    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <Navbar />
            <div style={{ padding: "0" }}>
                <Component />
            </div>
        </div>
    );
};

export default UserPrivateRoute;
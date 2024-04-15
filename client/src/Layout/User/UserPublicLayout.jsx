import React from "react";
import { Layout } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
const { Content } = Layout;

const UserPublicRoute = ({ component: Component, ...rest }) => {
    return (
        <div>
            <Navbar />
            <div style={{ padding: "0", marginTop: "16vh" }}>
                <Component />
            </div>
        </div>
    );
};

export default UserPublicRoute;
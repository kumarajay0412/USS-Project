import React from "react";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Profile = React.lazy(() => import('./pages/Profile'));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

const routes = [
    {
        path: "/",
        component: <Home />,
        privateRoute: true
    },
    {
        path: "/login",
        component: <Login />,
        privateRoute: false
    },
    {
        path: "*",
        component: <ErrorPage />,
        privateRoute: false
    },
    {
        path: "/profile",
        component: <Profile />,
        privateRoute: true
    }
];
export default routes;
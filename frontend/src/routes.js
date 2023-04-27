import React from "react";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

const routes = [
    {
        path: "/home",
        component: <Home />,
        privateRoute: true
    },
    {
        path: "/login",
        component: <Login />,
        privateRoute: false
    },
    {
        path: "/",
        component: <Login />,
        privateRoute: false
    },
    {
        path: "*",
        component: <ErrorPage />,
        privateRoute: false
    }
];
export default routes;
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import ApplicationsLayout from "./components/Applications/ApplicationsLayout.jsx";
import Applications from "./components/Applications/Apllications.jsx"
import PlacementsLayout from "./components/Placements/PlacementsLayout.jsx";
import Placements from "./components/Placements/Placements.jsx"
import NotificationsLayout from "./components/Notifications/NotificationsLayout.jsx";
import Notifications from "./components/Notifications/Notifications.jsx"
import ListLayout from "./components/List/ListLayout.jsx";
import List from "./components/List/List.jsx"
import ProfileLayout from "./components/Profile/ProfileLayout.jsx";
import Profile from "./components/Profile/Profile.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World ):</div>
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },
      {
        path: "applications",
        element: <ApplicationsLayout />,
        children: [
          {
            index: true,
            element: <Applications />,
          },
        ],
      },
      {
        path: "placements",
        element: <PlacementsLayout />,
        children: [
          {
            index: true,
            element: <Placements />,
          },
        ],
      },
      {
        path: "notifications",
        element: <NotificationsLayout />,
        children: [
          {
            index: true,
            element: <Notifications />,
          },
        ],
      },
      {
        path: "list",
        element: <ListLayout />,
        children: [
          {
            index: true,
            element: <List />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfileLayout/>,
        children: [
          {
            index: true,
            element: <Profile/>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>
);
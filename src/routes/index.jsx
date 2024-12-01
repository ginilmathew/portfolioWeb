import { createBrowserRouter } from "react-router-dom";
import LandingScreen from "../screens/LandingScreen";
import HomeScreen from "../screens/HomeScreen";
import HomeLayout from "../components/HomeLayout";
import SkillScreen from "../screens/SkillScreen";
import EducationScreen from "../screens/EducationScreen";
import ProjectScreen from "../screens/ProjectScreen";
import AiChatScreen from "../screens/AiChatScreen";
import DashboardLayout from "../components/DashboardLayout";
import LoginLayout from "../components/LoginLayout";
import LoginScreen from "../screens/auth/LoginScreen";
import AdminSkillsScreen from "../screens/admin/AdminSkillsScreen";
import AdminProfileScreen from "../screens/admin/AdminProfileScreen";
import AdminProjectsScreen from "../screens/admin/AdminProjectsScreen";
import AdminEducationScreen from "../screens/admin/AdminEducationScreen";
import ProtectedRouter from "./protectedRoutes";
import Wificreen from "../screens/WifiScreen";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingScreen />,
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <LoginScreen />,
      },
    ],
  },
  {
    path: "home",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "skill",
        element: <SkillScreen />
      },
      {
        path: "education",
        element: <EducationScreen />
      },
      {
        path: "project",
        element: <ProjectScreen />
      },
      {
        path: "aichat",
        element: <AiChatScreen />
      },
      {
        path: "wifiHotspot",
        element: <Wificreen />
      },

    ]
  },
  {
    path: 'admin',
    element: <ProtectedRouter><DashboardLayout /></ProtectedRouter>,
    children: [
      {
        index: true,
        element: <AdminEducationScreen />
      },
      {
        path: "skill",
        element: <AdminSkillsScreen />
      },
      {
        path: "profile",
        element: <AdminProfileScreen />
      },
      {
        path: "project",
        element: <AdminProjectsScreen />
      }
    ]

  },

]);
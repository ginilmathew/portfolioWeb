import { createBrowserRouter } from "react-router-dom";
import LandingScreen from "../screens/LandingScreen";
import HomeScreen from "../screens/HomeScreen";
import HomeLayout from "../components/HomeLayout";
import SkillScreen from "../screens/SkillScreen";
import EducationScreen from "../screens/EducationScreen";
import ProjectScreen from "../screens/ProjectScreen";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingScreen />,
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
    ]
  },
]);
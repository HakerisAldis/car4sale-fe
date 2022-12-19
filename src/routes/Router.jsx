import { useRoutes } from "react-router-dom"
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import Registration from "../pages/Registration/Registration";
import { PATHS } from "./routes";
import Header from "../components/Header";
import MyVehicles from "../pages/MyVehicles/MyVehicles";
import Footer from "../components/Footer";
import AdminGuard from "../guards/AdminGuard";
import Admin from "../pages/Admin/Admin";

export const Router = () => {
  return useRoutes([
    {
      path: PATHS.main,
      element: (
        <>
          <Header />
          <Main />
          <Footer />
        </>
      ),
    },
    {
      path: PATHS.login,
      element: (
        <GuestGuard>
          <Header />
          <Login />
          <Footer />
        </GuestGuard>
      )
    },
    {
      path: PATHS.registration,
      element: (
        <GuestGuard>
          <Header />
          <Registration />
          <Footer />
        </GuestGuard>
      )
    },
    {
      path: PATHS.myVehicles,
      element:
        <AuthGuard>
          <Header />
          <MyVehicles />
          <Footer />
        </AuthGuard>
    },
    {
      path: PATHS.admin,
      element:
        <AdminGuard>
          <Admin />
        </AdminGuard>
    }
  ]);
}
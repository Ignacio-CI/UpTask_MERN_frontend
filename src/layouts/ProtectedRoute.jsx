import { Outlet, Navigate } from "react-router-dom";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ProtectedRoute = () => {
    const { auth, loading } = useAuth();

    if(loading) return <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  return (
    <>
      {auth._id ? (
        <div className="bg-gray-100">
          <Header />

          <div className="md:flex md:min-h-screen">
            <Sidebar />

            <main className="flex-1 p-10">
              <Outlet />
            </main>
          </div>
        </div>

      ) : <Navigate to="/" />}
    </>
  )
}

export default ProtectedRoute

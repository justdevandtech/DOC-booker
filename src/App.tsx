import { Box } from '@chakra-ui/react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Layout } from './components/Layout';
import { Toaster } from 'react-hot-toast';
import { ProtectedRouted } from './components/ProtectedRouted';
import { PublicRoute } from './components/PublicRoute';
import { Loading } from './components/Loading';
import { useEffect, useState } from "react";

/**************************************** */
const appStyles = {
  backgroundColor: "#fafafa",
  minHeight: "100vh",
  display: "flex",
};
/**************************************** */

function App() {
  //show loading screen while dom is loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  , []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Box style={appStyles}>
        <Routes>
          <Route
            path='*'
            element={
              <ProtectedRouted>
                <Layout />
              </ProtectedRouted>
            }
          />
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      <Toaster position='top-center' reverseOrder={false} />
    </Box>
  );
}

export default App;

import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './components/Home';
import { GlobalProvider, GlobalContext } from './components/GloablState'
import Cart from './components/cart';
import ProductDetails from './components/productDetails';
import Navbar from './components/Navbar';
import AdminPanel from './components/Admin';
import Login from './components/Login';
import ErrorBoundary from './components/Errorboundry'; // Make sure path is correct


const App: React.FC = () => {
  return (
    <GlobalProvider> 
      <Router>
        <AppRoutes /> 
      </Router>
    </GlobalProvider>
  );
};

const AppRoutes: React.FC = () => {
  const context = useContext(GlobalContext);

  // Handle case where context is undefined (outside of GlobalProvider)
  if (!context) {
    return <div>Loading... </div>; // Or some error/loading indicator
  }

  const { state } = context;
  const isAuthenticated = !!state.user;
  const isAdmin = state.user?.role === 'admin';

  return (
    <>
      {/* Navbar outside Routes to always show */}
      {isAuthenticated && <Navbar />} 
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
            <ErrorBoundary>
              <Login /> 
            </ErrorBoundary>
          } 
        />

        {/* Protected Routes */}
        <Route path="/" element={
          <ErrorBoundary>
            {isAuthenticated ? <Home /> : <Navigate to="/login" />}
          </ErrorBoundary>  
        } />
        <Route path="/product/:id" element={
          <ErrorBoundary>
            {isAuthenticated ? <ProductDetails /> : <Navigate to="/login" />}
          </ErrorBoundary>  
        } />
        <Route path="/cart" element={
          <ErrorBoundary>
            {isAuthenticated ? <Cart /> : <Navigate to="/login" />} 
          </ErrorBoundary>
        } />

        {/* Admin Route */}
        <Route path="/admin" element={
          <ErrorBoundary>
            {isAdmin ? <AdminPanel /> : <Navigate to="/" />} 
          </ErrorBoundary>
        } /> 

        {/* Catch-all for unmatched routes */}
        <Route path="*" element={
          <ErrorBoundary>
            <Navigate to={isAuthenticated ? '/' : '/login'} />
          </ErrorBoundary>
        } />
      </Routes>
    </>
  );
};

export default App;

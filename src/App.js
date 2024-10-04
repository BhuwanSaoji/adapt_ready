import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/Authentication';
import DishDetailsPage from './pages/dishDetailPage/DishDetails';
import "./App.css"
import HomePage from './pages/homepage/HomePage';
// import NavBar from '../components/NavBar';
import SearchByIngredients from './pages/searchByIngredients/SearchByIngredients';
import ProtectedRoute from './routes/ProtectedRoutes';
import LoginContainer from './pages/loginContainer/LoginContainer';


function App(){

  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginContainer />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route

              path="/search_by_ingredients"
              element={
                <ProtectedRoute>
                  <SearchByIngredients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dish/:name"
              element={
                <ProtectedRoute>
                  <DishDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginContainer />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;


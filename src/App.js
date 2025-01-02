import './App.css';
import { NavarbarExported } from './components/Navbar'
import { HeroExported } from './components/Hero';
import { FeaturesExport } from './components/Features';
import { About } from './components/Aboutus';
import { Contact } from './components/ContactUs';
import { UserDashboardExpo } from './components/userComponents/UserDashboard'; // Importar el dashboard
import { LoginFormExpo } from './components/AuthComponents/LoginForm';
import { RegisterFormExpo } from './components/AuthComponents/RegisterForm';
import { AdminDashboardExpo } from './components/AdminComponents/AdminDashboard';
import { ArticleGameExpo } from './components/userComponents/games/articleGame/ArticleGame';
import FlashcardGame from './components/userComponents/games/FlaschardGame/FlashcardGame';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';  // Importa el componente PrivateRoute
import { useParams } from 'react-router-dom';





function ArticleGameWithDifficulty() {
  const { difficulty } = useParams(); // Extrae la dificultad desde la URL

  // Pasa la dificultad al componente ArticleGameExpo
  return <ArticleGameExpo difficulty={difficulty} />;
}


function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/"
          element={
            <div className="App">
              <NavarbarExported />
              <HeroExported />
              <FeaturesExport />
              <About />
              <Contact />
              <footer className="bg-gray-900 py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="text-center text-sm text-gray-400">
                    © 2024 SpracheApp. All rights reserved.
                  </div>
                </div>
              </footer>
            </div>
          }
        />
        
        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboardExpo />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboardExpo />
            </PrivateRoute>
          }
        />

        {/* Rutas públicas */}
        <Route path="/login" element={<LoginFormExpo />} />
        <Route path="/register" element={<RegisterFormExpo />} />
        <Route
          path="/articlegame/:difficulty"
          element={
            <ArticleGameWithDifficulty />
          }
        />        <Route path="/play" element={<FlashcardGame />} />
      </Routes>
    </Router>
  );
}

export default App;

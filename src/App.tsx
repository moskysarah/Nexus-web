import { Routes, Route } from 'react-router-dom';
import {ProtectedRoute} from './components/auth/ProtectedRoute';
import Home from './page/Home';
import Dashboard from './page/Dashboard';
import Navbar from './components/layouts/Navbar'; 
import Profile from './page/Profile';
import Leaderboard from './page/Leaderboard';
import Auth from './page/Auth';
import Courses from './components/ui/Courses'; 
import Lesson from './page/Lesson';
import HtmlSemantic from './page/HtmlSemantic'
import JsVariables from './page/JsVariables';
import CssBasics from './page/CssBasic';
import MessageReminder from './components/ui/MessageReminder';
import Footer from './components/layouts/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* 1. On place la Navbar ici pour qu'elle soit visible sur TOUTES les pages */}
      <Navbar />

      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Auth />} />

        {/* 2. Routes Protégées (Une seule page par route !) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
       
        <Route path="/courses/html-semantic"
         element={
         <ProtectedRoute>
            <HtmlSemantic />
          </ProtectedRoute>} 
        />
        <Route path="/courses/css-basic"
         element={
            <ProtectedRoute>
              <CssBasics />
            </ProtectedRoute>
         } />

        <Route path="/courses/js-variables"
         element={
            <ProtectedRoute>
               <JsVariables />
            </ProtectedRoute>
         } 
        />
        
        <Route path="/leaderboard"
         element={
         <ProtectedRoute>
          <Leaderboard />
          </ProtectedRoute>} />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/lesson/:id" 
          element={
            <ProtectedRoute>
              <Lesson />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/messagereminder" 
          element={
            <ProtectedRoute>
              <MessageReminder />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route path="/footer"
        element={
          <ProtectedRoute>
            <Footer />
          </ProtectedRoute> 

        } 
        />

      </Routes>
    </div>
  );
}

export default App;
import LayoutPage from "./components/layout/layout"
import Home from "./pages/Home/home"
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import Projects from "./pages/Projetos/projects"
import Nucleos from "./pages/Núcleos/nucleos"
import Login from "./pages/Login/login"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./services/firebaseConfig"
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if(!user) {
    return <Navigate to={"/"} replace/>
  }

  return (
    <Routes>
      {children}
    </Routes>
  );
}

const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <LayoutPage>
              <ProtectedRoute>
                <Route path="/petianos" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/nucleos" element={<Nucleos />} />
              </ProtectedRoute>
            </LayoutPage>
          }
        />
      </Routes>
    </Router>
  )
}

export default RoutesApp

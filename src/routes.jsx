import LayoutPage from "./components/layout/layout"
import Home from "./pages/Home/home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Projects from "./pages/Projetos/projects"
import Nucleos from "./pages/Núcleos/nucleos"

const RoutesApp = () => {
  return (
    <Router>
      <LayoutPage>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/nucleos" element={<Nucleos />} />
        </Routes>
      </LayoutPage>
    </Router>
  )
}

export default RoutesApp

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CVs from './pages/CVs';
import Builder from './pages/Builder';
import Importer from './pages/Importer';
import Error from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cvs" element={<CVs />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/importer" element={<Importer />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

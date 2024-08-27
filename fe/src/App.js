import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Manage from './pages/Manage';
function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/manage" element={<Manage />} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SpyMessenger from './spyMasseger/spyMasseger';
import GetMessage from './getMassege/getMassege';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SpyMessenger />} />
          <Route path="/:uuid" element={<GetMessage />} />
        </Routes>
       
      </div>
    </Router>
  );
}

export default App;

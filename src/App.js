import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Namescape from './components/Namescape';
import Address from './components/Address'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Namescape />} />
          <Route exact path='/address' element={<Address />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

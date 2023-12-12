import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Namescape from './components/Namescape';
import Address from './components/Address'
import NameKn from './components/NameKn';
import Cdac from './components/Cdac';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Namescape />} />
          <Route exact path='/address' element={<Address />} />
          <Route exact path='/name' element={<NameKn />} />
          <Route exact path='/search' element={<Cdac />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

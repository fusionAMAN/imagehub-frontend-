import 'bootstrap/dist/css/bootstrap.min.css';
import { Headers } from './components/Headers';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import {Routes, Route} from "react-router-dom"
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
  <Headers/>
  <Routes>
    <Route path='/'element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
  </Routes>
  <Toaster/>
    </>
  );
}

export default App;

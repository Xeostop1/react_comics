import './App.css';
import Home from './routes/Home';
import Detail from './routes/Detail';
import {BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/movie/:id" element={<Detail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// 배열이면 map으로 꺼내오기


import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from './components/Layout';
import NoPage from './pages/NoPage';
import Products from './pages/Products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path = "products" element = {<Products />} />
          <Route path="*" element={<NoPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

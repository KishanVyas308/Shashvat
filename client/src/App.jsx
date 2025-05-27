// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot, useRecoilState } from "recoil";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductPage from "./pages/ProductPage";

import Productdetail from "./pages/Productdetail";
import NavBar from "./Componets/NavBar";
import Fotter from "./Componets/Fotter";
import Loading from "./Componets/Loading";
import { loadingAtom } from "./Atoms/loadingAtom";

function App() {
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);

  useEffect(() => {}, [isLoading]);

  return (
    <HelmetProvider>
      <RecoilRoot>
        <div className="App">
          <Router>
            <NavBar />
            {isLoading ? <Loading /> : <></>}
            <Routes>
             <Route path="/" element={<Home />} />
                          
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/products" element={<ProductPage />} />
                            <Route path="/productdetail/:id" element={<Productdetail />} />
                    <Route path="/products/:category" element={<ProductPage />} />
                    <Route path="/products/:category/:subcategory" element={<ProductPage />} />
              
            
            </Routes>
          <Fotter />
          </Router>
        </div>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;

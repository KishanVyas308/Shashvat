// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot, useRecoilState } from "recoil";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductPage from "./pages/ProductPage";
import Productdetail from "./pages/Productdetail";
import CheckIsAdmin from "./middlewares/CheckIsAdmin";
import ManageProducts from "./pages/admin/ManageProducts";
import CustomerReviews from "./pages/admin/CustomerReviews";
import ClientRequirements from "./pages/admin/ClientRequirements";
import CheckIsUser from "./middlewares/CheckIsUser";
import UserProfile from "./pages/UserProfile";
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
        <ToastContainer   position="bottom-right" // Set toast position to bottom-right
        autoClose={3000 }// Auto close after 3 seconds (optional)
        hideProgressBar={false} // Show or hide progress bar (optional)
        newestOnTop={false} // Display newest toast on top
        closeOnClick // Allow to close the toast on click
        rtl={false} // Set right-to-left if needed (optional)
        pauseOnFocusLoss // Pause toast timer when the window loses focus
        draggable // Allow dragging of the toast
        pauseOnHover />
          <Router>
            <NavBar />
            {isLoading ? <Loading /> : <></>}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
         
              <Route path="/products" element={<ProductPage />} />
              <Route path="/productdetail/:id" element={<Productdetail />} />
              {/* user */}
              <Route element={<CheckIsUser />}>
                <Route path="/profile" element={<UserProfile />} />
              </Route>
              {/* admin */}
              <Route element={<CheckIsAdmin />}>
                <Route path="/admin/manage-products" element={<ManageProducts />} />
                <Route path="/admin/customer-reviews" element={<CustomerReviews />} />
                <Route path="/admin/client-requirements" element={<ClientRequirements />} />
              </Route>
            </Routes>
          <Fotter />
          </Router>
        </div>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;

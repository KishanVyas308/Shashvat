import React, { useEffect } from "react";
import Info from "../Componets/Info";

import HeroSlider from "../Componets/HeroSlider";
import ProductList from "../Componets/ProductList";
import InfoSection from "../Componets/InfoSection";
import PopularProduct from "../Componets/PopularProduct";
// import Testinomial from "../Componets/Testinomial";

import ContactInfo from "../Componets/ContactInfo";
import Fotter from "../Componets/Fotter";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { allProduct } from "../backend/manageProduct";
import { productAtom } from "../Atoms/productsAtom";
import Loading from "../Componets/Loading";
import SEO from '../Componets/SEO';
import seoData from '../Componets/Seos';
import Testinomialcaresoul from "../Componets/Testinomialcaresoul";
import CounterContainer from "../Componets/CounterContainer";
// import ManufacturingProcess from "../Componets/ManufacturingProcess";
const Home = () => {
  const [products, setProducts] = useRecoilState(productAtom);

  const { title, description, keywords } = seoData.home;


  const user = useRecoilValue(userAtom);

  async function setUp() {
    const p = await allProduct();
    setProducts(p);
   
  }
  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  
  useEffect(() => {
  
    scrollToTop()
    setUp();
  }, []);

  return (
    <div>
      <SEO title={title} description={description} keywords={keywords}  />
      
      <main className="p-0  m-0">
        <HeroSlider />
      </main>
      <Info />
    
      
      <ProductList />
      <InfoSection />
      <PopularProduct />
      {/* <ManufacturingProcess/> */}
      <CounterContainer />
      <Testinomialcaresoul />
      {/* <Testinomial /> */}
      <ContactInfo />
      <br />
    </div>
  );
};

export default Home;

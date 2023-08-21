import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Nav';
import Stock from './components/Stock';
import CarDetails from "./components/car/CarDetails"
import Search from "./components/Search"
import Testdrive from "./components/car/Testdrive" //component name needs to start with upper case letter
import ContactUs from "./components/ContactUs"


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation/>
        <div className="container container-fluid">
          <Routes>
          <Route path="/stock" element={<Stock/>}  />
          <Route path="/car/:id/testdrive" element={<Testdrive/>} exact  />
          <Route path="/car/:id" element={<CarDetails/>} exact  />
          <Route path="/" element={<Search/>} exact  />
          <Route path="/search" element={<Stock/>}   />
          <Route path="/contact" element={<ContactUs/>}  exact />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
 
  );
}

export default App;

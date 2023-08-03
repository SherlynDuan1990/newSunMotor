import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Nav';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation/>
        <div className="container container-fluid">
          <Routes>
            
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
 
  );
}

export default App;

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Nav';
import Stock from './components/Stock';
import CarDetails from './components/car/CarDetails';
import Search from './components/Search';
import Testdrive from './components/car/Testdrive';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Login from './components/user/Login';
import AdminStock from './components/AdminStock';
import AddNewCar from './components/car/AddNewCar';
import UpdateCar from './components/car/UpdateCar';
import Dashboard from './components/Dashboard';
import SalesAgreement from './components/SalesAgreement';
import Account from './components/user/Account';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes without header, footer, and navigation */}
          <Route path="/login" element={<Login />} exact />

          {/* Routes with header, footer, and navigation */}
          <Route path="/*" element={<WithHeaderFooterNav />} />
        </Routes>
      </div>
    </Router>
  );
}

const WithHeaderFooterNav = () => (
  <React.Fragment>
    <Header />
    <Navigation />
    <div className="container container-fluid">
      <Routes>
        <Route path="/stock" element={<Stock />} />
        <Route path="/car/:id/testdrive" element={<Testdrive />} exact />
        <Route path="/car/:id" element={<CarDetails />} exact />
        <Route path="/" element={<Search />} exact />
        <Route path="/search" element={<Stock />} />
        <Route path="/contact" element={<ContactUs />} exact />
        <Route path="/about" element={<AboutUs />} exact />
        <Route path="/admin/stock" element={<AdminStock />} exact />
        <Route path="/admin/add-vehicle" element={<AddNewCar />} exact />
        <Route path="/car/:id/update" element={<UpdateCar />} />
        <Route path="/admin/dashboard" element={<Dashboard />} exact />
        <Route path="/admin/sell-vehicle" element={<SalesAgreement />} exact />
        <Route path="/admin/account" element={<Account />} exact />
        <Route path="/*" element={<NotFoundComponent />} />
      </Routes>
    </div>
    <Footer />
  </React.Fragment>
);

const NotFoundComponent = () => (
  <div>
    <h1>404 Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default App;

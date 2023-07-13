import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore';
import Fundraiser from './pages/Fundraiser';
import CreateFundraiser from './pages/CreateFundraiser';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <div>
        <TopNav />
      </div>
      <div>
        <Home />
      </div>
      <div>
        <SignUp />
      </div>
      <div>
        <Explore />
      </div>
      <div>
        <Fundraiser />
      </div>
      <div>
        <CreateFundraiser />
      </div>
      <div>
        <Footer />
      </div>
      <div>
        <NotFound />
      </div>

    <div>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/sign-up"
            element={<SignUp />}
          />
          <Route
            path="/explore"
            element={<Explore />}
          />
          <Route
            path="/fundraiser/:id"
            element={<Fundraiser />}
          />
          <Route
            path="/create-fundraiser"
            element={<CreateFundraiser />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;

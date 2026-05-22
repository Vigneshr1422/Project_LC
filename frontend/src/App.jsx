import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";


function App() {

  return (

    <BrowserRouter>

      <ScrollToTop />

      <Routes>

        <Route path="/" element={<MainLayout />}>

          <Route
            index
            element={<Home />}
          />

          <Route
            path="services"
            element={<Services />}
          />

          <Route
            path="menu"
            element={<Menu />}
          />

          <Route
            path="contact"
            element={<Contact />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
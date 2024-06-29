import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import URL from "./pages/URL";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/urls" element={<URL />} />
        <Route path="/analytics" element={<Analytics/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
